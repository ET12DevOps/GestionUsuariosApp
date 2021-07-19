const express = require('express')
const router = express.Router()
const db = require('../../models')
const User = db.User
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt');

router.get('/users', async (req, res) => {
    await User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });
})

router.get('/users/:id', async (req, res) => {
    const id = req.params.id;

    await User.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
})

router.post('/users', async (req, res) => {

    // Validar el request (si no es vacio)
    if (!req.body.username || !req.body.password || !req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Crear un usuario
    const user = {
        id: uuidv4(),
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        enabled: true,
        createAt: new Date().getDate(),
        createdBy: '',
        updatedAt: new Date().getDate(),
        updatedBy: ''
    };

    // Guardo el usuario en la base de datos
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
})

router.put('/users/:id', async (req, res) => {
    const id = req.params.id;

    //actualizo la informacion del objeto user
    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
})

router.delete('/users/:id', async (req, res) => {

    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
})

module.exports = router
