//imports
const express = require('express')
const db = require('./models')
var bodyParser = require('body-parser');
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passportLocal = require('passport-local').Strategy

const app = express()

//puerto desde variable de entorno o 3000 por defecto
const port = process.env.PORT || 3000;

//body parser para leer el contenido json ubicado en el body en cada request
app.use(express.urlencoded({ extended: true }));

//secreto para la cookie
app.use(cookieParser('123456qwerty'))

app.use(session({
    secret: '123456qwerty',
    resave: true,
    saveUninitialized: true
}))

//configuracion passport
app.use(passport.initialize())

.use(passport.session())

passport.use(new passportLocal(function(username, password, done) {
    if (username === 'admin@mail.com' && password === "1234")
        return done(null, { id: 1, name: 'asd' })
    done(null, false)
}))

passport.serializeUser((user, done) => {
    done(null, user, user.id)
})

passport.deserializeUser((user, done) => {
    done(null, user, {id: 1, name: 'asd' })
})

app.post('/login', 
    passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: '/login'
}))

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

//expone contenido estatico (css, js, img, etc)
app.use('/public', express.static(__dirname + '/public'));

//defino el motor de render para html
app.set('views', './views')
app.set('view engine', 'ejs')

//declaracion views controllers
app.use('/', require('./controllers/user.controller'))
app.use('/', require('./controllers/role.controller'))
app.use('/', require('./controllers/index.controller'))
app.use('/', require('./controllers/dashboard.controller'))
app.use('/', require('./controllers/account.controller'))
app.use('/', require('./controllers/session.controller'))

//declaracion api controllers
app.use('/api', require('./controllers/api/user.controller'))
app.use('/api', require('./controllers/api/role.controller'))
app.use('/api', require('./controllers/api/login.controller'))

//inicializacion base de datos (si no existe se crea) 
db.sequelize.sync().then((req) => {

    //inicializacion server mediante el puerto definido
    app.listen(port, (err) => {
        console.error(err)
    });
})
