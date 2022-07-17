const express = require('express');
const router = express.Router();

const Enfermedad = require("../models/Enfermedad");

router.get("/getEnfermedadRel", (req,res) => {
    // Se tiene 4 síntomas ingreesados y se compara con los síntomas de todas las enfermedades y te regresa la probabilidad
    // probabilidad = (s1*0.15 + s2*0.15 + s3*0.25 + s4*0.15 + s5*0.13 + s6*0.1 + s7*0.05)
    let sl = req.body;
    
    Enfermedad.find({})
        .then()
})