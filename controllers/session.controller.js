const express = require('express')
const router = express.Router()
const auth = require('../auth')

router.get('/sessions', auth.isLoggedIn, (req, res) => {

    res.render('./pages/sessions', { 
        title: "Sesiones",
        user: req.user
    })
})

module.exports = router