// Figma: https://www.figma.com/proto/etc4RIJbccl1LPGfu1Pjml/AppSalud?node-id=15%3A40&scaling=contain&page-id=0%3A1&starting-point-node-id=16%3A136

require('dotenv').config();
const config = require('./config/config');

require('./config/database');

const morgan = require('morgan');
const express = require('express')

const app = express();
const cors = require('cors');
app.use(cors());

const EnfermedadRouter = require('./api/Enfermedad');
const EmergenciaRouter = require('./api/Emergencia');
const SintomasRouter = require('./api/Sintomas');
const MapsRouter = require('./api/Maps');

let bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(morgan("dev"));

app.set('port', process.env.PORT || config.portExpress)

app.use('/Enfermedad', EnfermedadRouter);
app.use('/Emergencia', EmergenciaRouter);
app.use('/Sintomas', SintomasRouter);
app.use('/Maps', MapsRouter);


app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})