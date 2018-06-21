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

trainerRouter.put("/trainer/:id", (req, res) => {
    console.log(req.body);
    
    pool.query("UPDATE users SET pokemon_2=$1::int, pokemon_3=$2::int, pokemon_4=$3::int, pokemon_5=$4::int, pokemon_6=$5::int WHERE id=$6::int", [req.body.pokemon_2, req.body.pokemon_3, req.body.pokemon_4, req.body.pokemon_5, req.body.pokemon_6, req.params.id]).then(() => {
        pool.query("SELECT * FROM users ORDER BY id").then((result) => {
            res.send(result.rows);
        })
    })
})

module.exports = trainerRouter;