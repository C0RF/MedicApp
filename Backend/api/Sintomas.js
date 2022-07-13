const express = require('express');
const router = express.Router();

const Enfermedad = require("../models/Enfermedad");

router.get("/getEnfermedadRel", (req,res) => {
    // Se tiene 4 síntomas ingreesados y se compara con los síntomas de todas las enfermedades y te regresa la probabilidad
    // probabilidad = (s1*0.15 + s2*0.12 + s3*0.10 + s4*0.7)/ suma de pesos asignados
    Enfermedad.find({})
        .then()
})