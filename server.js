const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

var app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));

require("./routes")(app);

app.listen(PORT, ()=>{
  console.log(`App running on port ${PORT}!`);
});