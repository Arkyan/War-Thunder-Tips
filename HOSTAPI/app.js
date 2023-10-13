const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')

app.use(cors())

app.use((req, res, next) => {

    // -----------------------------------------------------------------------
    // authentication middleware

    const auth = { login: 'login', password: 'password' } // change this

    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    // Verify login and password are set and correct
    if (login && password && login === auth.login && password === auth.password) {
        // Access granted...
        return next()
    }

    // Access denied...
    res.set('WWW-Authenticate', 'Basic realm="401"') // change this
    res.status(401).send('Authentication required.') // custom message

    // -----------------------------------------------------------------------

})

app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API de gestion de fichiers !')
})

app.get('/getstats', (req, res) => {
    fs.readFile('data/stats.json', (err, data) => {
        if (err) {
            res.status(500).send('Erreur lors de la lecture du fichier')
        } else {
            res.send(JSON.parse(data))
        }
    })
})

app.get('/getstats/:param', (req, res) => {
    fs.readFile('../data/stats.json', (err, data) => {
        if (err) {
            res.status(500).send('Erreur lors de la lecture du fichier')
        } else {
            let stats = JSON.parse(data)
            let param = req.params.param
            if (stats[param] !== undefined) {
                res.send(stats[param])
            } else {
                res.status(404).send('La propriété ' + param + ' n\'existe pas')
            }
        }
    })
})

app.get('/setstats/:param/:value', (req, res) => {
    fs.readFile('./data/stats.json', (err, data) => {
        if (err) {
            res.status(500).send('Erreur lors de la lecture du fichier')
        } else {
            let stats = JSON.parse(data)
            let param = req.params.param
            let value = req.params.value
            if (stats[param] !== undefined) {
                stats[param] = value
                fs.writeFile('./data/stats.json', JSON.stringify(stats), (err) => {
                    if (err) {
                        res.status(500).send('Erreur lors de la sauvegarde du fichier')
                    } else {
                        res.send('La propriété ' + param + ' a été modifiée avec la valeur ' + value)
                    }
                })
            } else {
                res.status(404).send('La propriété ' + param + ' n\'existe pas')
            }
        }
    })
})

app.listen(8080, () => { console.log("Le serveur API a été démarré sur le port 8080") })