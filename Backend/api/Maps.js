const express = require('express');
const router = express.Router();
const axios = require('axios');



router.post("/getNearestPlaces", (req, res) => {
    const {lat, lng, radius, type, googleApiKey} = req.body
    //console.log("body", req.body)
    //console.log("body", body))
    const config = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=${radius}&type=${type}&key=${googleApiKey}`,
            headers: { }
        }; 
    axios(config)
      .then( (response)  => {
        //console.log(JSON.stringify(response.data));
        res.json({
            status: "SUCCESS",
            message: "Lugares obtenidos",
            data: response.data.results
        });
      })
      .catch( (error)  => {
        console.log(error);
        res.status(500).send({error: 'No se pueden obtener los lugares!'});
      });
});

module.exports = router;