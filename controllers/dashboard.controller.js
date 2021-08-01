const express = require('express')
const router = express.Router()
const auth = require('../auth')

router.get('/dashboard', auth.isLoggedIn, (req, res) => {
   res.render('./dashboard/index', { 
       title: "Panel",
       user: req.user
    })
})

module.exports = router