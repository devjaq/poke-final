"use strict";


const express = require("express");
const http = require("http");
const request = require("request");

const pg = require("pg");
const pool = require("../pg-connection-pool");

const trainerRouter = express.Router();

trainerRouter.get("/trainer", (req, res) => {
    pool.query("SELECT * FROM users ORDER BY id").then((result) => {
        res.send(result.rows);
    });
});

trainerRouter.post("/trainer", (req, res) => {
    pool.query("INSERT INTO users (username, quiz_result, pokemon_1) VALUES ($1::text, $2::text, $3::int)", [req.body.username, req.body.quiz_result, req.body.pokemon_1])
    .then((result) => {
        res.send(result.rows);
    });
});

module.exports = trainerRouter;