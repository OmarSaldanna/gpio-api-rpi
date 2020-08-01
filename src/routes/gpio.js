/*
> GPIO.JS
This file declares the other routes for the app, and import the functions for each route
> route: http://localhost:4000/api/users/
*/

// Import the router module from the express library
const { Router } = require('express');

// declare a new route
const router = Router();

// import the db functions for the routes
const { getGpioStatus, getGpioState, addGpio, setGpioState, removeGpio } = require('../controllers/gpio.controller');

// usamos la ruta principal para saber si esta lista la API
router.route('/')
  .get(getGpioStatus)
  .post(addGpio)
  
// y una con un pin para interactuar con pines gpio
  router.route('/:pin')
  .get(getGpioState)
  .put(setGpioState)
  .delete(removeGpio)

// export the route object
module.exports = router;