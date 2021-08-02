const express = require('express')
const router = express.Router()
const auth = require('../auth')

router.get('/roles', auth.isLoggedIn, (req, res) => {
    res.render('./roles/index', { 
        title: "Roles",
        user: req.user
    })
})

router.get('/roles/:id/edit', auth.isLoggedIn, (req, res) => {
    res.render('./roles/edit', { 
        title: "Rol",
        roleId: req.params.id,
        user: req.user
    })
})

router.get('/roles/:id/delete', auth.isLoggedIn, (req, res) => {
    res.render('./roles/delete', { 
        title: "Rol",
        roleId: req.params.id,
        user: req.user 
    })
})

router.get('/roles/add', auth.isLoggedIn, (req, res) => {
    res.render('./roles/add', { 
        title: "Rol",
        user: req.user       
    })
})

module.exports = router