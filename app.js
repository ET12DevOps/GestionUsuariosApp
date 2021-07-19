//imports
const express = require('express')
const db = require('./models')
var bodyParser = require('body-parser');

const app = express()

//puerto desde variable de entorno o 3000 por defecto
const port = process.env.PORT || 3000;

//body parser para leer el contenido json ubicado en el body en cada request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
