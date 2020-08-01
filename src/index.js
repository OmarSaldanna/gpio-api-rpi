/*
> INDEX.JS*
This is the main file, it imports the sever app 'APP.JS' and the database app 'DATABASE.JS'
*/

// Adjust the setting to read .env file
require('dotenv').config();

// Import the database app
// require('./conn');

// Import the server app
const app = require('./server');

// for a clean code use a main function, starting the server
async function main() {
  // start the server listening on the port selected
  await app.listen(app.get('port'));
  // print the port's server
  console.log('Server on port ' + app.get('port'));
}

// execute the main function
main();