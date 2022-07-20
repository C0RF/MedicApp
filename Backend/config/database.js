const config = require('./config');

const mongoose = require("mongoose");

// const uri = `mongodb://127.0.0.1:27017/${config.nameDatabase}`;

// dale permiso a tu uri desde mongo atlas (lectura y escritura)
const uri = `mongodb+srv://david20190591J:20190591J@clusterd.mnper.mongodb.net/${config.nameDatabase}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
    useNewUrlParser: true
})
    .then(db => console.log("MongoDB connection established"))
    .catch(err => console.log("MongoDB connection failed:", err.message));