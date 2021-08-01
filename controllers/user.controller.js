const express = require('express')
const router = express.Router()
const auth = require('../auth')

router.get('/users', auth.isLoggedIn, (req, res) => {
    res.render('./users/index', {
        title: 'Usuarios',
        user: req.user
    })
})

router.get('/users/:id/edit', auth.isLoggedIn, (req, res) => {
    res.render('./users/edit', {
        title: 'Usuario',
        userId: req.params.id,
        user: req.user
    })
})

router.get('/users/:id/delete', auth.isLoggedIn, (req, res) => {
    res.render('./users/delete', {
        title: 'Usuario',
        userId: req.params.id,
        user: req.user
    })
})

router.get('/users/add', auth.isLoggedIn, (req, res) => {
    res.render('./users/add', {
        title: 'Usuario',
        user: req.user
    })
})

module.exports = router