const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // sesuaikan
  password: "", // sesuaikan
  database: "kontak_app",
});

connection.connect((err) => {
  if (err) {
    console.error("Gagal konek ke database:", err);
  } else {
    console.log("Terkoneksi ke MySQL ✅");
  }
});

module.exports = connection;
