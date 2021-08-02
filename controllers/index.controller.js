const express = require('express')
const router = express.Router()
const auth = require('../auth')

router.get('/', auth.isLoggedIn, (req, res) => {
    
    res.render('index', { 
        title: "Home",
        user: req.user
    })

})

module.exports = router