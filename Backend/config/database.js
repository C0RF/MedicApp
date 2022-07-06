const config = require('./config');

const mongoose = require("mongoose");

const uri = `mongodb://127.0.0.1:27017/${config.nameDatabase}`;

mongoose.connect(uri, {
    useNewUrlParser: true
})
    .then(db => console.log("MongoDB connection established"))
    .catch(err => console.log("MongoDB connection failed:", err.message));