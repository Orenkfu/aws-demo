const logger = require('../middleware/logger');
const cors = require('../middleware/cors');
const express = require('express');
const users = require('../controllers/auth-controller');
const movies = require('../controllers/movies-controller');
const orders = require('../controllers/orders-controller');
const error = require('../middleware/error');


module.exports = function (app) {
    app.use(cors);
    app.use(logger.log)
    app.use(express.json());
    app.use(error);
    app.use('/api/auth', users);
    app.use('/api/movies', movies);
    app.use('/api/orders', orders);
}