// const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017", {
//   dbName: "IITMandi_Project",
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });
const config = require("../config");

const mysqlConfig = config.mysql;
console.log(mysqlConfig.username); // Output: "root"
console.log(mysqlConfig.host); // Output: "localhost"
console.log(mysqlConfig.port); // Output: 3306
console.log(mysqlConfig.password); // Output: ""
console.log(mysqlConfig.database); // Output: "cca"

// module.exports = db;

const mysql = require("mysql2");

// Create a connection pool
const pool = mysql.createPool({
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.username,
  password: config.mysql.password,
  database: config.mysql.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Connect to MySQL
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.stack);
    return;
  }
  console.log("Connected to MySQL as id", connection.threadId);
  connection.release();
});

module.exports = pool.promise();
