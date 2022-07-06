const config = require('./config/config');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express')

const app = express();
// var cors = require('cors');
// app.use(cors());

var EnfermedadRouter = require('./api/Enfermedad.js');
var EmergenciaRouter = require('./api/Emergencia.js');

require('./config/database');


app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(morgan("dev"));

app.use('/Enfermedad',EnfermedadRouter);
app.use('/Emergencia',EmergenciaRouter);


app.listen(config.portExpress, () => {
    console.log(`Server on port ${config.portExpress}`);
})