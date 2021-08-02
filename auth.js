const passport = require('passport')
const passportLocal = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require('./models')
const User = db.User

passport.use(new passportLocal(async function(username, password, done) {
    
    const userLogged = await User.findOne({ where: { username: username } })
        
    await bcrypt.compare(password, userLogged.dataValues.password)
        .then(function(err, result) {
            return done(null, userLogged.dataValues)
        })
        .catch(err => {            
            done(null, false)
        })
}))

passport.serializeUser((user, done) => {
    done(null, user, user.id)
})

passport.deserializeUser(async (user, done) => {
    const userLogged = await User.findByPk(user.id)
    done(null, userLogged.dataValues)
})

//middleware para verificar si un usuario se encuentra logueado
module.exports = {
    isLoggedIn: function isLoggedIn(req, res, next) {
        return req.user ? next() : res.redirect('/login')
    }    
}
