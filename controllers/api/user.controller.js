const express = require('express')
const router = express.Router()
const db = require('../../models')
const User = db.User
const Role = db.Role
const UserRole = db.UserRole
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt');
const auth = require('../../auth')
const { Op } = require("sequelize");

router.get('/users', auth.isLoggedIn, async (req, res) => {

    await User.findAll({
        attributes: ['id', 'username', 'email', 'firstName', 'lastName', 'enabled', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy']
    })
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

router.get('/users/:id', auth.isLoggedIn, async (req, res) => {
    const id = req.params.id;

    await User.findByPk(id, {
        attributes: ['id', 'username', 'email', 'firstName', 'lastName', 'enabled', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy'],
        include: "roles"
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
})

router.post('/users', auth.isLoggedIn, async (req, res) => {

    // Validar el request (si no es vacio)
    if (!req.body.username || !req.body.password || !req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const roles = await Role.findAll({
        where: {
            id: {
                [Op.or]: req.body.roles
            }
        }
    })

    // Crear un usuario
    const newUser = {
        id: uuidv4(),
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        enabled: req.body.enabled,
        createAt: Date.now(),
        createdBy: '',
        updatedAt: Date.now(),
        updatedBy: ''
    };

    // Guardo el usuario en la base de datos
    const user = await User.create(newUser)

    if (user != null) {
        roles.forEach(role => {
            user.addRole(role)
        })

        const userWithRoles = await User.findByPk(user.id, {
            include: "roles"
        })

        res.send(userWithRoles);
    } else {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the User."
        });
    }
})

router.put('/users/:id', auth.isLoggedIn, async (req, res) => {
    const id = req.params.id;

    // Guardo el usuario en la base de datos
    const num = await User.update(req.body, {
        where: { id: id }
    })

    if (num != 1) {
        res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
    }

    const user = await User.findByPk(id, {
        include: "roles"
    })

    if (user != null) {

        if (user.roles.length > 0) {
            await UserRole.destroy({
                where: {
                    userId: user.id
                }
            })
        }

        let userRoles = []

        req.body.roles.forEach(role => {
            userRoles.push({
                userId: user.id,
                roleId: role
            })
        })

        await UserRole.bulkCreate(userRoles)

        res.send(user);
    } else {
        res.status(500).send({
            message: "Error updating User with id=" + id
        });
    }
})

router.delete('/users/:id', auth.isLoggedIn, async (req, res) => {

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
                    message: `Cannot delete User with id = ${id}.Maybe User was not found!`
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
