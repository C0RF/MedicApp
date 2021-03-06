const {
    Schema,
    model
} = require('mongoose')
const EnfermedadSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    sintomas: {
        type: Array,//[{s1:1},{s2:2}]
        required: true
    },
    causas: {
        type: String,
        required: true
    },
    recomendaciones: {
        type: String,
        required: true
    },
    consideraciones: {
        type: String,
        required: true
    }
});

module.exports = model('Enfermedad', EnfermedadSchema);