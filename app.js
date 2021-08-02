//imports
const express = require('express')
const db = require('./models')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const auth = require('./auth')
var geoip = require('geoip-lite')

const Login = db.Login

const app = express()

//puerto desde variable de entorno o 3000 por defecto
const port = process.env.PORT || 3000;

//body parser para leer el contenido json ubicado en el body en cada request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//secreto para la cookie
app.use(cookieParser('123456qwerty'))

app.use(session({
    secret: '123456qwerty',
    resave: true,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 60
}))

//configuracion passport
app.use(passport.initialize())

app.use(passport.session())

app.post('/login', 
    passport.authenticate('local'), async (req, res) => {
        
        if (!req.user) { 
            return res.redirect('/login'); 
        }

        var geo = geoip.lookup(req.ip)

        //creo objeto login
        const login = {
            userId: req.user.id,
            username: req.user.username,
            ip: req.ip,
            browser: req.headers["user-agent"],
            language: req.headers["accept-language"],
            country: geo ? geo.country : "Unknown",
            region: geo ? geo.region : "Unknown",
            loggedAt: Date.now()
        };

        // Persisto el login en la base de datos
        Login.create(login)
            .then(data => {
                
            })
            .catch(err => {
                return res.redirect('/login'); 
            });

        return res.redirect('/'); 
    })

app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy()
    res.redirect('/login');
});

//expone contenido estatico (css, js, img, etc)
app.use('/public', express.static(__dirname + '/public'));

//defino el motor de render para html
app.set('views', './views')
app.set('view engine', 'ejs')
app.set('trust proxy', true);

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
app.use('/api', require('./controllers/api/session.controller'))

//inicializacion base de datos (si no existe se crea) 
db.sequelize.sync().then((req) => {

    //inicializacion server mediante el puerto definido
    app.listen(port, (err) => {
        console.error(err)
    });
})
