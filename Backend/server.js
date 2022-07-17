// Figma: https://www.figma.com/proto/etc4RIJbccl1LPGfu1Pjml/AppSalud?node-id=15%3A40&scaling=contain&page-id=0%3A1&starting-point-node-id=16%3A136

const config = require('./config/config');

require('./config/database');

const morgan = require('morgan');
const express = require('express')

const app = express();
var cors = require('cors');
app.use(cors());

var EnfermedadRouter = require('./api/Enfermedad');
var EmergenciaRouter = require('./api/Emergencia');

let bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(morgan("dev"));

app.use('/Enfermedad',EnfermedadRouter);
app.use('/Emergencia',EmergenciaRouter);


app.listen(config.portExpress, () => {
    console.log(`Server on port ${config.portExpress}`);
})