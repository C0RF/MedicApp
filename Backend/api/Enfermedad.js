const express = require('express');
const router = express.Router();

const Enfermedad = require("../models/Enfermedad");

//Guardar enfermedad
router.post("/createEnfermedad", (req, res) => {
    let {
        nombre,
        descripcion,
        sintomas,
        causas,
        recomendaciones,
        consideraciones
    } = req.body;
    nombre = nombre.trim();
    descripcion = descripcion.trim();
    causas = causas.trim();
    recomendaciones = recomendaciones.trim();
    consideraciones = consideraciones.trim();

    if (nombre == "" || descripcion == "" || causas == "" || sintomas.length === 0) {
        res.json({
            status: "FAILED",
            message: "Hay campos vacíos"
        });
    } else {
        Enfermedad.find({
                nombre
            })
            .then((resultado) => {
                if (resultado.length) {
                    res.json({
                        status: "FAILED",
                        message: "Ya existe una enfermedad con ese nombre"
                    });
                } else {
                    const newEnfermedad = new Enfermedad({
                        nombre,
                        descripcion,
                        sintomas,
                        causas,
                        recomendaciones,
                        consideraciones
                    });

                    newEnfermedad
                        .save()
                        .then((resultado) => {
                            res.json({
                                status: "SUCCESS",
                                message: "Enfermedad guardada",
                                data: resultado
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                            res.json({
                                status: "FAILED",
                                message: "Ha ocurrido un error al intentar crear una enfermedad"
                            });
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                res.json({
                    status: "FAILED",
                    message: "Se produjo un error al buscar una enfermedad existente"
                });
            });
    }
});

//Guardar enfermedades
router.post("/createEnfermedades", (req, res) => {
    let arrayEnfermedades = req.body;

    for (let i = 0; i < arrayEnfermedades.length; i++) {
        let {
            nombre,
            descripcion,
            sintomas,
            causas,
            recomendaciones,
            consideraciones
        } = arrayEnfermedades[i];

        nombre = nombre.trim();
        descripcion = descripcion.trim();
        causas = causas.trim();
        recomendaciones = recomendaciones.trim();
        consideraciones = consideraciones.trim();

        if (nombre == "" || descripcion == "" || causas == "" || sintomas.length === 0) {
            res.json({
                status: "FAILED",
                message: `Enfermedad ${nombre} tiene campos vacios`,
            });
            break;
        } else {
            Enfermedad.find({
                    nombre
                })
                .then((resultado) => {
                    if (resultado.length) {
                        res.json({
                            status: "FAILED",
                            message: `Ya existe una enfermedad con el nombre ${nombre}`
                        });
                    } else {
                        const newEnfermedad = new Enfermedad({
                            nombre,
                            descripcion,
                            sintomas,
                            causas,
                            recomendaciones,
                            consideraciones
                        });

                        newEnfermedad
                            .save()
                            .then((resultado) => {
                                process.stdout.write(`Enfermedad ${nombre} creado`);
                                process.stdout.clearLine();
                                process.stdout.cursorTo(0);
                            })
                            .catch((err) => {
                                res.json({
                                    status: "FAILED",
                                    message: "Ha ocurrido un error al intentar crear una enfermedad, " + err
                                });
                            });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.json({
                        status: "FAILED",
                        message: "Se produjo un error al buscar una enfermedad existente"
                    });
                });
        }
    }
});

//Obtener enfermedad seleccionada
router.get("/getEnfermedad", (req, res) => {
    // const nombre = 'Cólera';
    const nombre = decodeURIComponent(req.query.nombre);
    // const nombre = 'Osteoporosis';
    Enfermedad.find({
            nombre
        })
        .then((resultado) => {
            if (resultado.length == 0) {
                res.json({
                    status: "FAILED",
                    message: "No existe el nombre de la enfermedad"
                });
            } else {
                res.json({
                    status: "SUCCESS",
                    message: "Enfermedad obtenida",
                    data: resultado
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "Se produjo un error al intentar obterner la enfermedad"
            });
        });
});

//Obtener enfermedades relacionadas a la búsqueda
router.get("/getEnfermedades", (req, res) => {
    // cuando nombre="" que retorne todos
    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    nombre_enfermedad = removeAccents(req.query.enfermedad.toLowerCase())
    const nombre = new RegExp(`\.\*${decodeURIComponent(nombre_enfermedad)}\.\*`);
    let resultados = []
     
    async function comp() {
        for await (const doc of Enfermedad.find()){
            let nombres_db = doc.nombre;

            if((nombre.test(removeAccents(nombres_db.toLowerCase())))){
                resultados.push(doc);
            }
        }
        return resultados
    }
    console.log(nombre)
    comp().then((resultado) => {
            if (resultado.length == 0) {
                res.status(404).send({
                    status: "FAILED",
                    message: "registro vacio",
                });
            } else {
                res.json({
                    status: "SUCCESS",
                    message: "Enfermedades obtenidas",
                    data: resultado
                })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(404).send({
                status: "FAILED",
                message: "Se ha producido un error al obtener enfermedades"
            })
        })
});

module.exports = router;