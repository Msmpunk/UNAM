// Requires
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

// Modelo de usuario
let Usuario = require('./models/usuario');

// Importar rutas
let appRoutes = require('./routes/app');
let usuarioRoutes = require('./routes/usuario');
let loginRoutes = require('./routes/login');
let readXlsxFile = require('read-excel-file/node');

// Inicializar variables
let app = express();

// Conexión a la base de datos

mongoose.connect('mongodb://localhost:27017/Unam', {
    useCreateIndex: true,
    useNewUrlParser: true
}, (err, res) => {
    if (err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online')
})

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);

app.use('/', appRoutes);

// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});
 

// readXlsxFile('./AlumnosP5.xlsx').then((rows) => {
//     let nombre;
//     let noCuenta;
//     let user;
//     for (let i = 0; i < rows.length ; i++) {
//         nombre = rows[i][0].toString();
//         noCuenta = rows[i][1].toString();
//         user = new Usuario({
//             noCuenta: noCuenta,
//             nombre: nombre,
//             role: 'ALUMNO_ROLE'
//         })
//         user.save((err, usuarioGuardado) => {
//             if(err){
//                 console.log(err)
//             }
//         });
        
//     }
// })
 