const dbConfig = require("../config/db.config.js");
require('dotenv').config()


const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.tutorials = require("./tutorial.model.js")(mongoose);

module.exports = db;