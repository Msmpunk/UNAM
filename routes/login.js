let express = require('express');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

let SEED = require('../config/config').SEED;

let app = express();
let Usuario = require('../models/usuario');


let mdAutenticacion = require('../middlewares/autenticacion');

// ==========================================
//  Autenticación normal
// ==========================================
app.post('/', async (req, res) => {
    let usuarioDB;
    let body = req.body;

    usuarioDB = await Usuario.findOne({ email: body.email });

    if(body.email){
        usuarioDB = await Usuario.findOne({ email: body.email });
    }

    if(body.rfc){
        usuarioDB = await Usuario.findOne({ email: body.email });
    }

    if(body.noCuenta){
        usuarioDB = await Usuario.findOne({ email: body.noCuenta });
    }

    if (!usuarioDB) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Credenciales incorrectas - email',
        });
    }

    if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Credenciales incorrectas - password',
        });
    }
    usuarioDB.password = ':)';

    var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }); // 4 horas

    res.status(200).json({
        ok: true,
        usuario: usuarioDB,
        token: token,
        id: usuarioDB._id,
        // menu: obtenerMenu(usuarioDB.role)
    });
});

function obtenerMenu(ROLE) {

    var menu = [{
            titulo: 'Principal',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Dashboard', url: '/dashboard' },
                { titulo: 'ProgressBar', url: '/progress' },
                { titulo: 'Gráficas', url: '/graficas1' },
                { titulo: 'Promesas', url: '/promesas' },
                { titulo: 'RxJs', url: '/rxjs' }
            ]
        },
        {
            titulo: 'Mantenimientos',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                // { titulo: 'Usuarios', url: '/usuarios' },
                { titulo: 'Hospitales', url: '/hospitales' },
                { titulo: 'Médicos', url: '/medicos' }
            ]
        }
    ];

    if (ROLE === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: '/usuarios' });
    }

    return menu;

}



module.exports = app;