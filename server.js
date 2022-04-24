var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var path=require("path")
var app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb'}));
app.use(cookieParser());

// Bodyparser middleware, extended false does not allow nested payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//una vez acabado el proyecto hacer que redirija a la api de swagger

app.use(express.static('public'));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.use('/api/v1/songs', require('./routes/song'));

module.exports = app;
