
require("dotenv").config();
const db = require("./db");

db.query(
  "SELECT id, email, password, created_at FROM users ORDER BY id DESC",
  (err, results) => {
    if (err) {
      console.error(err.message);
    } else {
      console.table(results);
    }
    db.end();
  }
);
