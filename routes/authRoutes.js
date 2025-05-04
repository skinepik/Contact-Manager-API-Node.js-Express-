const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");
const { body } = require("express-validator");

router.post("/login", login);
router.post("/register", [body("email").isEmail().withMessage("Format email tidak valid"), body("password").isLength({ min: 6 }).withMessage("Password minimal 6 karakter")], register);

router.get("/test", (req, res) => {
  res.send("Auth route aktif");
});

router.get("/tes-register", (req, res) => {
  res.send("Route register aktif");
});

module.exports = router;
