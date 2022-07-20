const express = require('express');
const router = express.Router();

const Enfermedad = require("../models/Enfermedad");

router.post("/enfermedadesRelacionadas", (req, res) => {
    lista_sintomas = req.body.sintomas;

    let results = [];
    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function ordenarProb(results) {
        let i, j, aux;
        for (i = 1; i < results.length; i++) {
            for (j = 0; j < (results.length - i); j++) {
                if (results[j][1] < results[j + 1][1]) {
                    aux = results[j];
                    results[j] = results[j + 1];
                    results[j + 1] = aux;
                }
            }
        }
        return results
    }

    async function obtProb() {
        for await (const doc of Enfermedad.find()) {
            sintomas_db = doc.sintomas;
            let prob_sum = 0;
            lista_sintomas.forEach((sintomas_paciente) => {
                sintomas_db.forEach((sintomas) => {
                    if (removeAccents(sintomas[0].toLowerCase()) == removeAccents(sintomas_paciente.toLowerCase())) {
                        prob_sum = prob_sum + sintomas[1];
                    }
                });
            });
            if (prob_sum != 0) {
                results.push([doc.nombre, prob_sum]);
            }
        }


        return ordenarProb(results);
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