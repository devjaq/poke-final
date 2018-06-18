"use strict";

const express = require("express");
const http = require("http");
const request = require('request');

// const pg = require("pg");
// const pool = new pg.Pool();

const pageRouter = express.Router();

pageRouter.get('/pokedex/:num', (req, res) => {
  request('http://pokeapi.co/api/v2/pokemon/'+ req.params.num, (error, response, body) => {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode);
    res.send(body)
  }) // end main request
});
  

module.exports = pageRouter;
// module.exports.extra = pageRouter.image;