const mongoose = require("mongoose");
require("dotenv").config()
const connection = mongoose.connect(process.env.atlas_URL);

module.exports ={connection}