const express = require("express");
const router = express.Router();

const Emergencia = require("./../models/Emergencia");

function addEmg(body) {
    let {
        nombre,
        Normas,
        Escena,
        Solicitud,
        Signos,
        Consideraciones
    } = body;

    Emergencia.find({
        nombre: nombre
    }).then((r) => {
        if (r.lenght) {
            res.json({
                msg: "Ya existe."
            })
        } else {
            const nEmg = new Emergencia(body);
            nEmg.save().then((r) => {}).catch((err) => {
                console.log(err);
            })
        }
    });
}

router.post('/add', (req, res) => {

    addEmg(req.body);

});


router.get('/get/:param', async function (req, res) {
    let param = req.params.param;

    if (param = "all") {
        try {

            emg_list = await Emergencia.find().select('nombre').exec();

            res.json({
                data: emg_list
            });
            return;
        } catch (err) {
            console.log(err);
            return;
        }
    } else {
        try {

            emg = await Emergencia.findOne({
                nombre: param
            }).exec();
            res.json({
                data: emg
            });
        } catch (err) {
            console.log(err);
        }
        return;

    }

});


module.exports = router;