const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");


// Create a connection to the database
const connection = mysql.createPool({
  connectionLimit : 10,
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  timezone : 'Z'
});
// open the MySQL connection
connection.getConnection(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;