const express = require('express')

const router = express.Router()

router.get('/dashboard', (req, res) => {

    res.render('./pages/dashboard', { 
        title: "dashboard",
        homeClassActive: "text-gray-600",
        dashboardClassActive: "text-pink-500",
        userClassActive: "text-gray-500",
        roleClassActive: "text-gray-500",
        loginClassActive: "text-gray-500" 
    })
})

module.exports = router