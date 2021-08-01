const express = require('express')
const router = express.Router()
const auth = require('../auth')
var geoip = require('geoip-lite')

router.get('/sessions', auth.isLoggedIn, (req, res) => {
    var geo = geoip.lookup(req.ip)

    var headers = {
        ip: req.ip,
        browser: req.headers["user-agent"],
        acceptLanguage: req.headers["accept-language"],
        country: geo ? geo.country: "Unknown",
        region: geo ? geo.region: "Unknown"
    }

    res.render('./pages/sessions', { 
        title: "Sesiones",
        user: req.user,
        headers: headers
    })
})

module.exports = router