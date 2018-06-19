"use strict";

const express = require("express");
const http = require("http");
const request = require("request");

const pg = require("pg");
const pool = require("../pg-connection-pool");

const quizRouter = express.Router();

quizRouter.get("/quiz", (req, res) => {
    pool.query("SELECT * FROM questions ORDER BY id").then((result) => {
        res.send(result.rows);
        console.log(req.body);
    });
});

module.exports = quizRouter;