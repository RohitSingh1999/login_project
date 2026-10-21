
const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

const caCert = process.env.DB_CA_CERT
  ? process.env.DB_CA_CERT.replace(/\\n/g, "\n")
  : fs.readFileSync(path.join(__dirname, "ca.pem"), "utf8");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  ssl: {
    ca: caCert,
  },

  connectTimeout: 20000,
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err.message);
    return;
  }

  console.log("Aiven MySQL connected successfully!");
});

module.exports = db;
