const express = require('express')
const router = express.Router()
const db = require('../../models')
const Login = db.Login
const { v4: uuidv4 } = require('uuid')

router.get('/logins', async (req, res) => {
    await Login.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Logins."
            });
        });
})

router.post('/logins', async (req, res) => {

    // Validar el request (si no es vacio)
    if (!req.body.provider || !req.body.providerKey) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Crear un login
    const login = {
        id: uuidv4(),
        provider: req.body.provider,
        providerKey: req.body.providerKey,
        createAt: new Date().getDate(),
    };

    // Persisto el login en la base de datos
    Login.create(login)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Login."
            });
        });
})

module.exports = router
