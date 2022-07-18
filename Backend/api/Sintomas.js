const express = require('express');
const router = express.Router();

const Enfermedad = require("../models/Enfermedad");

router.get("/getEnfermedadRel", (req, res) => {
    // Se tiene 4 síntomas ingreesados y se compara con los síntomas de todas las enfermedades y te regresa la probabilidad
    // probabilidad = (s1*0.15 + s2*0.15 + s3*0.25 + s4*0.15 + s5*0.13 + s6*0.1 + s7*0.05)
    ssl = req.body;
    // var sl = ["Estatura baja"];
    var results = [];
    async function obtProb() {
        for await (const doc of Enfermedad.find()) {
            s = doc.sintomas;
            var prob_sum = 0;
            ssl.forEach((e) => {
                s.forEach((se) => {
                    if (se[0] == e) {
                        prob_sum = prob_sum + se[1];
                    }
                });
            });
            if (prob_sum != 0) {
                results.push([doc.nombre, prob_sum]);
            }
        }
        return results;
    };
    obtProb().then((result) => {

        res.json({
            status: "SUCCESS",
            message: "Enfermedad obtenida correctamente",
            data: result
        });
    }).catch((e) => {
        console.log(e);
    });
});

module.exports = router;