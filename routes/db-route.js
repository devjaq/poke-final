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

dbRouter.post("/pokemon", (req, res) => {
  pool.query("INSERT INTO pokemon (id, name, type, hp, attack, defense, speed, move_1, move_2, move_3, move_4) VALUES($1::int ,$2::text, $3::text, $4::int, $5::int, $6::int, $7:: int, $8::text, $9::text, $10::text, $11::text)", [req.body.id, req.body.name, req.body.type, req.body.hp, req.body.attack, req.body.defense, req.body.speed, req.body.move_1, req.body.move_2, req.body.move_3, req.body.move_4]).then(() => {
    pool.query("SELECT * FROM pokemon ORDER BY id").then((result) => {
      res.send(result.rows);
    });
  })
  console.log(req.body.id);
  console.log(req.body.name);

});
  

module.exports = dbRouter;