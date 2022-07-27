const config = require('./config');

const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI

mongoose.connect(uri, {
        useNewUrlParser: true
    })
    .then(db => console.log("MongoDB connection established"))
    .catch(err => console.log("MongoDB connection failed:", err.message));