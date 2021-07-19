const express = require('express')

const router = express.Router()

router.get('/users', (req, res) => {

    res.render('./pages/user', {
        title: 'Users', 
        homeClassActive: "text-gray-500",
        dashboardClassActive: "text-gray-500",
        userClassActive: "text-purple-500",
        roleClassActive: "text-gray-500",
        loginClassActive: "text-gray-500" 
    })
})

module.exports = router