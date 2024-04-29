const express = require('express');
const planetsRouter = require('./planets/planetsRouter');
const launchesRouter = require('./launches/launchesRouter');

//create a router that capturing version1 of API
const api = express.Router();

//versioning api
api.use('/planets', planetsRouter);
api.use('/launches', launchesRouter);

module.exports = api;