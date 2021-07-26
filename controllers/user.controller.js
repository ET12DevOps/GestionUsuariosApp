const express = require('express')

const router = express.Router()

router.get('/users', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('./pages/users', {
            title: 'Usuarios'})
    } else {
        res.redirect('/login')
    }
})

module.exports = router