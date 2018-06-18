"use strict";

const express = require("express");
const http = require("http");
const request = require('request');

const pg = require("pg");
const pool = require("../pg-connection-pool");

const dbRouter = express.Router();
// GET
dbRouter.get("/pokemon", (req, res) => {
  pool.query("SELECT * FROM pokemon ORDER BY id").then((result) => {
    res.send(result.rows);
  });
});
  

module.exports = dbRouter;