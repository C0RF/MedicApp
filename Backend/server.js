const config = require('./config/config');

var express = require('express')
var app = express();
var cors = require('cors');
app.use(cors());

require('./config/db');


var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));


app.listen(config.portExpress, () => {
    console.log(`Servidor corriendo en el puerto ${config.portExpress}`);
})