const express = require('express')

const router = express.Router()

router.get('/roles', (req, res) => {

    res.render('./pages/role', { 
        title: "Roles",
        homeClassActive: "text-gray-500",
        dashboardClassActive: "text-gray-500",
        userClassActive: "text-gray-500",
        roleClassActive: "text-green-500",
        loginClassActive: "text-gray-500" 

    })
})

module.exports = router