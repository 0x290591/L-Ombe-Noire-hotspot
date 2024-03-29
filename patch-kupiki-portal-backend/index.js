import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import Sequelize from 'sequelize';
import config from './config.json';

const {
  RateLimiterMemory
} = require( 'rate-limiter-flexible' );

const limiterRegisterBruteByIP = new RateLimiterMemory( {
  points: config.register.maxRegisterConsecutiveFails,
  duration: config.register.intervalRegisterConsecutiveFails,
} );

const dbFreeradius = {
  Sequelize,
  sequelize: new Sequelize( config.sequelize.freeradius )
};

dbFreeradius.radcheck = dbFreeradius.sequelize.import( './models/radcheck.js' );
dbFreeradius.radusergroup = dbFreeradius.sequelize.import( './models/radusergroup.js' );

let app = express();

app.server = http.createServer( app );
app.use( bodyParser.urlencoded( {
  extended: true
} ) );
app.use( bodyParser.json() );

function handleError( res, statusCode ) {
  statusCode = statusCode || 500;
  return function ( err ) {
    return res.status( statusCode ).json( {
      status: 'failed',
      message: err
    } );
  };
}

app.post( '/register', function ( req, res ) {
  req.headers.origin && res.setHeader( 'Access-Control-Allow-Origin', req.headers.origin );
  limiterRegisterBruteByIP.consume( req.connection.remoteAddress )
    .then( () => {
      if ( !config.register.active ) return res.status( 200 ).json( {
        status: 'failed',
        message: 'Registration not allowed'
      } );

      const email = req.body.email;
      const value = Date.now()

      if ( !email || email === '' ) return res.status( 200 ).json( {
        status: 'failed',
        message: 'Wrong request structure'
      } );

      dbFreeradius.radcheck.create( {
          username: email,
          attribute: 'Cleartext-Password',
          op: ':=',
          value: value
        } )
        .then( () => {

          dbFreeradius.radusergroup.create( {
              username: email,
              groupname: 'RESTRICTIONS',
              priority: 1
            } )
            .then( () => {

              res.status( 200 ).json( {
                status: 'success',
                message: 'New user created. Now you can log in.',
                email: email,
                value: value
              } );

            } )
            .catch( () => {
              res.status( 200 ).json( {
                status: 'failed',
                message: 'Unable to apply the restrictions.'
              } );
            } )

        } )
        .catch( () => {
          res.status( 200 ).json( {
            status: 'failed',
            message: 'Unable to create the user.'
          } );
        } )

    } )
    .catch( ( rejRes ) => {
      const secs = Math.round( rejRes.msBeforeNext / 1000 ) || 1;
      res.set( 'Retry-After', String( secs ) );
      res.status( 429 ).send( 'Too many registration requests. Try again later.' );
    } );
} );

dbFreeradius.sequelize.sync().then(
  app.server.listen( process.env.NODE_PORT || config.server_port, () => {
    console.log( `Started on port ${app.server.address().port}` );
  } )
);

export default app;
