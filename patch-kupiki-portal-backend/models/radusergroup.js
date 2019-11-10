'use strict';

export default function ( sequelize, DataTypes ) {
  const radusergroup = sequelize.define( 'radusergroup', {
    username: {
      type: new DataTypes.STRING(),
      allowNull: false
    },
    groupname: {
      type: new DataTypes.STRING(),
      allowNull: false
    },
    priority: {
      type: new DataTypes.INTEGER(),
      allowNull: false
    },
  }, {
    freezeTableName: true,
    tableName: 'radusergroup',
    createdAt: false,
    updatedAt: false,
    deletedAt: false
  } );

  radusergroup.removeAttribute( 'id' )

  return radusergroup;
}
