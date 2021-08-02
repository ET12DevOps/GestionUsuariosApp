const express = require('express')
const router = express.Router()
const db = require('../../models')
const Login = db.Login

router.get('/session', async (req, res) => {
    await Login.findAll({
        limit: 10,
        order: [
            ['loggedAt','DESC']
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Logins."
            });
        });
})

module.exports = router
