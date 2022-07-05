const config = require('./config');


const mongoose = require("mongoose");

const uri = `mongodb://127.0.0.1:27017/${config.nameDatabase}`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connection.on('open', _ => {
    console.log('DB conectada en ', uri);
})

mongoose.connection.on('error', err => {
    console.log(err);
})