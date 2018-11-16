var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var rolesValidos = {
    values: ['ADMIN_ROLE', 'ALUMNO_ROLE', 'PROFESOR_ROLE'],
    message: '{VALUE} no es un rol permitido'
};


var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    noCuenta: { type: String },
    active: { type: Boolean, default: false },
    email: { type: String },
    password: { type: String },
    role: { type: String, required: true, default: 'ALUMNO_ROLE', enum: rolesValidos },
    rfc: { type: String }
});

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema);