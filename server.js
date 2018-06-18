"use strict";

const express = require("express");
const page = require("./routes/page-route");
const pokemon = require("./routes/db-route");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use("/portal", page);
app.use("/portal", pokemon);


app.use(express.static(__dirname + "/app/public"));

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
})

