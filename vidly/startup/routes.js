
const express = require('express');
const error = require('../middleware/error');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const winston = require('winston');
module.exports = function (app) { 
    //console.log("Inside routes");
    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies',movies);
    app.use('/api/rentals',rentals);
    app.use('/api/users',users);
    app.use('/api/auth',auth);
    app.use((err, req, res, next) => {
        // Log the error with Winston
        logger.error(err.message, { stack: err.stack });
        // Send a generic message to the client
        //res.status(500).send('An unexpected error occurred.');
    });
    app.use(error);
}    