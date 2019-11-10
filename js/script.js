const configuration = {
    register: {
        host: '192.168.10.1',
        port: '5000'
    },
    chilliController: {
        host: '192.168.10.1',
        port: '3990',
        interval: 60,
        ssl: false,
    }
}

let init = true

const alert = document.getElementById('alert'),
    form = document.getElementById('form')

form.addEventListener('submit', event => {

    const email = event.target.email.value

    if (email) fetch('http://' + configuration.register.host + ':' + configuration.register.port + '/register', { method: 'POST', body: new URLSearchParams({ email }), headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }) })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') chilliController.logon( data.email , String(data.value) )
            else alert.innerHTML = data.message
        })
    else alert.innerHTML = 'Vous devez renseigner votre email.'

    event.preventDefault()

})

const update = (code) => {
    if (chilliController.clientState === 1) document.location.href = 'https://www.google.com/search?q=L%27Ombre%20Noire%20:)'
    else if (init) init = false
    else alert.innerHTML = 'Un problème est survenu, veuillez réessayer plus tard.'
}, error = () => {
    alert.innerHTML = 'Erreur ' + code
}

chilliController.host = configuration.chilliController.host
chilliController.port = configuration.chilliController.port
chilliController.interval = configuration.chilliController.interval
chilliController.ssl = configuration.chilliController.ssl

chilliController.onError = error
chilliController.onUpdate = update

chilliController.debug = false

chilliController.refresh()
