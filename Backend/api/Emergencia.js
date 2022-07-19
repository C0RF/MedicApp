const express = require("express");
const router = express.Router();

const Emergencia = require("./../models/Emergencia");

function addEmg(res, body) {
    let {
        nombre,
        Normas,
        Escena,
        Solicitud,
        Signos,
        Consideraciones
    } = body;

    Emergencia.find({
        nombre
    }).then((r) => {
        if (r.length) {
            res.json({
                msg: "Ya existe."
            });
            return;
        } else {
            const nEmg = new Emergencia(body);
            nEmg.save().then((r) => {}).catch((err) => {
                console.log(err);
            })
        }
    }).catch((e)=>{
        console.log(e);
    });
}

router.post('/add', (req, res) => {

    addEmg(res, req.body);

});

router.post('/addList', (req, res) => {

    req.body.forEach((e) => {

        addEmg(res, e);
    })

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