/*
GPIO.CONTOLLER.JS
This file contains and export the functions for the route of users
*/

// import the mysql module
const mysql = require('mysql');

// and gpio module
const Gpio = require('onoff').Gpio;

// a function for connect to db
function connectDB() {
  // create a connection
  const conn = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: "gpio_api"
  });
  // return the connection
  return conn;
}

// create an object to export the db functions
const DB = {};

// get, a message for know if the API is available
DB.getGpioStatus = (req, res) => {
  // y respondemos
  res.json({status: 'okey'});
}

// post, add a gpio pin
DB.addGpio = (req, res) => {
  // get the user data
  const { pin, state } = req.body;
  // create a connection
  const conn = connectDB();
  // conect to db
  conn.connect(function (err) {
    // si hay error lo lanza
    if (err) { throw err; }
    // define a query
    const query = `INSERT INTO gpio VALUES(${pin}, ${state});`;
    console.log(query);
    // execute the query
    conn.query(query, (err, result) => {
      if (err) throw err;
      // send a response
      res.json({ message: "pin added" });
    });
  });
}

// get + pin, get the state from the pin
DB.getGpioState = (req, res) => {
  // get the pin
  const pin = req.params.pin;
  // create a connection
  const conn = connectDB();
  // execute the query
  conn.connect(function (err) {
    if (err) throw err;
    // create a query
    const query = `SELECT state FROM gpio WHERE pin = ${pin};`;
    console.log(query);
    // execute the query
    conn.query(query, (err, result) => {
      if (err) throw err;
      // send a response
      res.json(result);
    });
  });
}

// put + pin, change the state from the pin
DB.setGpioState = (req, res) => {
  // get the user pin
  const pin = req.params.pin;
  // get the user data
  const { state } = req.body;


  // proceso de encendido o apagado del gpio
  let led = new Gpio(pin, 'out');

  // si el estado es true encendemos el gpio
  if(state) { led.writeSync(1); }
  
  else { led.writeSync(0); led.unexport(); }

  // create a connection
  const conn = connectDB();

  // execute the query
  conn.connect(function (err) {
    if (err) { throw err; }
    // define a query
    const query = `UPDATE gpio SET state = ${state} WHERE pin = ${pin};`;
    console.log(query);
    // execute the query
    conn.query(query, (err, result) => {
      if (err) throw err;
      // send a response
      res.json({ message: "pin changed" });
    });
  });
}

// delete + pin, remove the pin register
DB.removeGpio = (req, res) => {
  // get the user id
  const pin = req.params.pin;
  // create a connection
  const conn = connectDB();
  // execute the query
  conn.connect(function (err) {
    if (err) { throw err; }
    // define a query
    const query = `DELETE FROM gpio WHERE pin = ${pin};`;
    console.log(query);
    // execute the query
    conn.query(query, (err, result) => {
      if (err) throw err;
      // send a response
      res.json({ message: "pin removed" });
    });
  });
}

// export the module with functions
module.exports = DB;