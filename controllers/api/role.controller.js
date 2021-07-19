const express = require('express')
const router = express.Router()
const db = require('../../models')
const Role = db.Role
const { v4: uuidv4 } = require('uuid')

router.get('/roles', async (req, res) => {
    await Role.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Roles."
            });
        });
})

router.get('/roles/:id', async (req, res) => {
    const id = req.params.id;

    await Role.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Roles with id=" + id
            });
        });
})

router.post('/roles', async (req, res) => {

    // Validar el request (si no es vacio el nombre)
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Crear un rol
    const role = {
        id: uuidv4(),
        name: req.body.name,
        enabled: true,
        createAt: new Date().getDate(),
        createdBy: '',
        updatedAt: new Date().getDate(),
        updatedBy: ''
    };

    // Guardo el rol en la base de datos
    Role.create(role)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Roles."
            });
        });
})

router.put('/roles/:id', async (req, res) => {
    const id = req.params.id;

    //actualizo la informacion del objeto role
    Role.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Role was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Role with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Role with id=" + id
            });
        });
})

router.delete('/roles/:id', async (req, res) => {

    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Role was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Role with id=${id}. Maybe Role was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Role with id=" + id
            });
        });
})

module.exports = router
