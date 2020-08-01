/*
> APP.JS
this file init the server app, make all the setting for the server, and init the routes
*/

// import modules for the server app
const express = require('express');
const cors = require('cors');

// init the server app
const app = express();

// host the API in the port that the sistem give us or in the 4000
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(cors());
app.use(express.json());

// use the route of /api/gpio for the file ./routes/gpio.js
app.use('/api/gpio', require('./routes/gpio'));

// export the server app to the main file
module.exports = app;