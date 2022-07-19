const express = require('express');
const router = express.Router();

const Enfermedad = require("../models/Enfermedad");

router.post("/enfermedadesRelacionadas", (req, res) => {
    lista_sintomas = req.body;
    let results = [];
    async function obtProb() {
        for await (const doc of Enfermedad.find()) {
            sintomas_db = doc.sintomas;
            let prob_sum = 0;
            lista_sintomas.forEach((sintomas_paciente) => {
                sintomas_db.forEach((sintomas) => {
                    if (sintomas[0] == sintomas_paciente) {
                        prob_sum = prob_sum + sintomas[1];
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