const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    
    if (req.isAuthenticated()) {
        res.render('index', { 
            title: "Home"
        })
    } else {
        res.redirect('/login')
    }
})

module.exports = router