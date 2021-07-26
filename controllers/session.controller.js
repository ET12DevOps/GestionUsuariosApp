const express = require('express')

const router = express.Router()

router.get('/sessions', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('./pages/sessions', { 
            title: "Sesiones"
        })
    } else {
        res.redirect('/login')
    }
})

module.exports = router