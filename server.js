"use strict";

const express = require("express");
const page = require("./page-route")
const bodyParser = require("body-parser");

const app = express();

// const options = {
//   host: 'http://pokeapi.co/api/v2/pokemon/4/',
//   path: '/page'
// }

app.use(bodyParser.json());
app.use("/portal", page);


app.use(express.static(__dirname + "/app/public"));

let port = 3000;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
})