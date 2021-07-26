const express = require('express')

const router = express.Router()

router.get('/roles', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('./pages/roles', { 
            title: "Roles"})
    } else {
        res.redirect('/login')
    }
})

module.exports = router