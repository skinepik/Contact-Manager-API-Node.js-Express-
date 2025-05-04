const jwt = require("jsonwebtoken");
const secretKey = "RAHASIA-BERSAMA"; // Sebaiknya pakai dari .env nanti

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Ambil token setelah "Bearer"

  if (!token) {
    return res.status(403).json({ error: "Token diperlukan untuk mengakses route ini." });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token tidak valid atau kadaluarsa." });
    }

    req.user = decoded; // Simpan data user ke req untuk keperluan selanjutnya
    next();
  });
};

module.exports = verifyToken;
