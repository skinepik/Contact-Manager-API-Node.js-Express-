const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secretKey = "RAHASIA-BERSAMA"; // Simpan di env file nanti

const login = (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Error saat login." });
    if (results.length === 0) return res.status(401).json({ error: "Email tidak ditemukan." });

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ error: "Password salah." });
      }

      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secretKey, { expiresIn: "1h" });

      res.json({ success: true, token });
    });
  });
};

const register = (req, res) => {
  const { email, password, role = "user" } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email dan password wajib diisi." });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Gagal akses database." });
    if (results.length > 0) return res.status(400).json({ error: "Email sudah terdaftar." });

    const hashedPassword = bcrypt.hashSync(password, 10);

    db.query("INSERT INTO users (email, password, role) VALUES (?, ?, ?)", [email, hashedPassword, role], (err, result) => {
      if (err) return res.status(500).json({ error: "Gagal menyimpan user." });

      const newUserId = result.insertId;
      const token = jwt.sign({ id: newUserId, email, role }, secretKey, { expiresIn: "1h" });

      res.json({
        success: true,
        message: "Registrasi berhasil & login otomatis!",
        token,
        userId: newUserId,
      });
    });
  });
};

module.exports = { login, register };
