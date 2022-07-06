const {Schema, model} = require('mongoose')
const EnfermedadSchema = new Schema({
    nombre: {type: String},
    descripcion: {type: String},
    sintomas: {type: String},
    causas: {type: Array, required: true},
    recomendaciones: {type: String},
    consideraciones: {type: String}
});

module.exports = model('Enfermedad', EnfermedadSchema)
