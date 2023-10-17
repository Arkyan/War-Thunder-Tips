const express = require('express')
const app = express()
var server = require('http').Server(app);
const fs = require('fs')
var io = require('socket.io')(server, {});
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {

    // -----------------------------------------------------------------------
    // authentication middleware

    const auth = { login: 'miniprojet', password: '2024' } // change this

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
    var secondes = process.uptime()
    var heures = Math.floor(secondes / 3600)
    var minutes = Math.floor((secondes - (heures * 3600)) / 60)
    var jours = Math.floor(heures / 24)
    var sec = Math.floor(secondes - (heures * 3600) - (minutes * 60))
    res.send('Bienvenue sur l\'API de gestion de fichiers ! Elle est en ligne depuis ' + jours + ' jours, ' + heures + ' heures et ' + minutes + ' minutes et ' + sec + ' secondes')
})

app.get('/getstats', (req, res) => {
    fs.readFile('stats.json', (err, data) => {
        if (err) {
            res.status(500).send('Erreur lors de la lecture du fichier')
        } else {
            res.send(JSON.parse(data))
        }
    })
})

app.get('/getstats/:param', (req, res) => {
    fs.readFile('stats.json', (err, data) => {
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
    fs.readFile('stats.json', (err, data) => {
        if (err) {
            res.status(500).send('Erreur lors de la lecture du fichier')
        } else {
            let stats = JSON.parse(data)
            let param = req.params.param
            let value = req.params.value
            if (stats[param] !== undefined) {
                stats[param] = value
                fs.writeFile('stats.json', JSON.stringify(stats), (err) => {
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

app.post('/posts', (req, res) => {
    fs.readFile('posts.json', (err, data) => {
        if (err) {
            res.status(500).send('Erreur lors de la lecture du fichier')
        } else {
            let datas = JSON.parse(data)
            var taille = 1;
            for (var k in datas) if (datas.hasOwnProperty(k)) taille++;

            let newPost = req.body
            newPost.id = taille
            datas[taille] = newPost

            fs.writeFile('posts.json', JSON.stringify(datas), (err) => {
                if (err) {
                    res.status(500).send('Erreur lors de la sauvegarde du fichier')
                } else {
                    res.send('Le post a été ajouté')
                }
            })
        }
    })
})

app.post("/Forum/user/connect", (req, res) => {
    fs.readFile('users.json', (err, data) => {
        if (err) {
            res.status(500).send('Erreur lors de la lecture du fichier')
        } else {
            let users = JSON.parse(data)
            let user = req.body
            let result = []
            for (var k in users) {
                if (users.hasOwnProperty(k)) {
                    if (users[k].pseudo == user.pseudo && users[k].mdp == user.mdp) {
                        result.push(users[k])
                    }
                }
            }
            if (result.length == 1) {
                res.send(result[0])
            } else {
                res.send('Utilisateur non trouvé, veuillez réessayer')
            }
        }
    })
})

app.post("/Forum/user/create", (req, res) => {
    fs.readFile('users.json', (err, data) => {
        if (err) {
            res.status(500).send('Erreur lors de la lecture du fichier')
        } else {
            let users = JSON.parse(data)
            let user = req.body
            var taille = 1;

            for (var k in users) {
                if (users.hasOwnProperty(k)) {
                    if (users[k].mail == user.mail || users[k].pseudo == user.pseudo) {
                        res.send('error1')
                        return
                    }
                }
            }

            for (var k in users) if (users.hasOwnProperty(k)) taille++;
            user.id = taille
            users[taille] = user
            fs.writeFile('users.json', JSON.stringify(users), (err) => {
                if (err) {
                    res.status(500).send('Erreur lors de la sauvegarde du fichier')
                } else {
                    res.send("L'utilisateur a été ajouté")
                }
            })
        }
    })
})

app.get("/Forum/user/:param", (req, res) => {
    fs.readFile('users.json', (err, data) => {
        if (err) {
            res.status(500).send('Erreur lors de la lecture du fichier')
        } else {
            let users = JSON.parse(data)
            let param = req.params.param
            let result = []
            for (var k in users) {
                if (users.hasOwnProperty(k)) {
                    if (users[k].pseudo == param) {
                        result.push(users[k])
                    }
                }
            }
            if (result.length == 1) {
                res.send(result[0])
            } else {
                res.send('Utilisateur non trouvé, veuillez réessayer')
            }
        }
    })
})

app.get('/posts', (req, res) => {
    fs.readFile('posts.json', (err, data) => {
        if (err) {
            res.status(500).send('Erreur lors de la lecture du fichier')
        } else {
            res.send(JSON.parse(data))
        }
    })
})

app.get('/posts/:param', (req, res) => {
    fs.readFile('posts.json', (err, data) => {
        if (err) {
            res.status(500).send('Erreur lors de la lecture du fichier')
        } else {
            let datas = JSON.parse(data)
            let param = req.params.param
            let result = []
            for (var k in datas) {
                if (datas.hasOwnProperty(k)) {
                    var tags = datas[k].tags
                    var array_tags = tags.split(',')
                    if (datas[k].title == param || datas[k].author == param || array_tags.includes(param)) {
                        result.push(datas[k])
                    }
                }
            }
            res.send(result)
        }
    })
})

app.post("/Forum/updateuser", (req, res) => {
    fs.readFile('users.json', (err, data) => {
        if (err) {
            res.status(500).send('Erreur lors de la lecture du fichier users')
        } else {
            let users = JSON.parse(data)
            let user = req.body
            for (var k in users) {
                if (users.hasOwnProperty(k)) {
                    if (users[k].pseudo == user.pseudo) {
                        user.id = users[k].id
                        user.mail = users[k].mail
                        user.mdp = users[k].mdp
                        users[k] = user
                    }
                }
            }
            fs.writeFile('users.json', JSON.stringify(users), (err) => {
                if (err) {
                    res.status(500).send('Erreur lors de la sauvegarde du fichier users')
                } else {
                    res.send('Utilisateur modifié')
                }
            })
        }
    })
})

app.get("/getcountries", (req, res) => {
    fs.readFile('countries.json', (err, data) => {
        if (err) {
            res.status(500).send('Erreur lors de la lecture du fichier')
        } else {
            res.send(JSON.parse(data))
        }
    })
})

server.listen(8083, "0.0.0.0", () => {
    console.log('Serveur à l\'écoute')
})