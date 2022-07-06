const express = require('express');
const router = express.Router();

const Enfermedad = require("../models/Enfermedad");

//Guardar enfermedad
router.post("/createEnfermedad", (req, res) => {
    let{nombre, descripcion, sintomas, causas, recomendaciones, consideraciones} = req.body;
    // nombre = nombre.trim();
    // descripcion = descripcion.trim();
    // causas = causas.trim();

    if(nombre == "" || descripcion == "" || causas == ""){
        res.json({
            status: "FAILED",
            message: "Hay campos vacíos"
          });
    }else{
        Enfermedad.find({nombre})
            .then((resultado) => {
                if(resultado.length){
                    res.json({
                        status: "FAILED",
                        message: "Ya existe una enfermedad con ese nombre"
                    });
                }else{
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
        let{nombre, descripcion, sintomas, causas, recomendaciones, consideraciones} = arrayEnfermedades[i];
        if(nombre == "" || descripcion == "" || causas == ""){
            res.json({
                status: "FAILED",
                message: `Enfermedad ${nombre} tiene campos vacios`,
            });
            break;
        }else{
            Enfermedad.find({nombre})
                .then((resultado) => {
                    if(resultado.length){
                        res.json({
                            status: "FAILED",
                            message: `Ya existe una enfermedad con el nombre ${nombre}`
                        });
                    }else{
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
    }
});

//Obtener enfermedad
router.get("/getEnfermedad", (req, res) => {
    const nombre = req.query.nombre;
    Enfermedad.find({nombre})
        .then((resultado) => {
            if(resultado.length == 0){
                res.json({
                    status: "FAILED",
                    message: "No existe el nombre de la enfermedad"
                });
            }else{
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

//Obtener enfermedades
router.get("/getEnfermedades", (req, res) => {
    Enfermedad.find({})
        .then((resultado) => {
            if(resultado.length == 0){
                res.json({
                    status: "FAILED",
                    message: "registro vacio",
                });
            }else{
                res.json({
                    status: "SUCCESS",
                    message: "Enfermedad obtenida"
                })
            }
        })
        .catch((err) => {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "Se ha producido un error al obtener enfermedades" 
            })
        })
});

module.exports = router;