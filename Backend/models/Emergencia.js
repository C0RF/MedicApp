const {
    Schema,
    model
} = require('mongoose')

const EmergenciaSchema = new Schema({
    nombre: {
        type: String
    },
    Normas: {
        type: Array
    },
    Escena: {
        type: String
    },
    Solicitud: {
        type: String
    },
    Signos: {
        type: Array
    },
    Consideraciones: {
        type: String
    },
});

module.exports = model('Emergencia', EmergenciaSchema);