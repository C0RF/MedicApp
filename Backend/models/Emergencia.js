const {
    Schema,
    model
} = require('mongoose')

const EmergenciaSchema = new Schema({
    nombre: {
        type: String
    },
    Normas: {
        type: String
    },
    Escena: {
        type: String
    },
    Solicitud: {
        type: String
    },
    Signos: {
        type: String
    },
    Consideraciones: {
        type: String
    },
});

module.exports = model('Emergencia', EmergenciaSchema);