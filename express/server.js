'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const cors = require("cors");

var corsOptions = {
    origin: process.env.EXP_CORS_ORIGIN || "http://localhost:8081"
};

console.log("PROCESS ENV EXP_CORS_ORIGIN", process.env.EXP_CORS_ORIGIN);
console.log("PROCESS ENV MONGO_DB_TESTDG", process.env.MONGO_DB_TESTDG);
console.log("corsOptions", corsOptions);

app.use(cors(corsOptions));

const router = express.Router();
router.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Hello from Express.js!</h1>');
    res.end();
});

require("./app/routes/turorial.routes")(app);

router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router); // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));


// DB Config
const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

module.exports = app;
module.exports.handler = serverless(app);