const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {

    res.render('index', { 
        title: "Home", 
        homeClassActive: "text-blue-500",
        dashboardClassActive: "text-gray-500",
        userClassActive: "text-gray-500",
        roleClassActive: "text-gray-500",
        loginClassActive: "text-gray-500" 
    })
})

module.exports = router