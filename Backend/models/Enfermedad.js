const {Schema, model} = require('mongoose')
const EnfermedadSchema = new Schema({
    nombre: {type: String},
    descripcion: {type: String},
    sintomas: {type: Array},
    causas: {type: String},
    recomendaciones: {type: String},
    consideraciones: {type: String}
});

module.exports = model('Enfermedad', EnfermedadSchema);
