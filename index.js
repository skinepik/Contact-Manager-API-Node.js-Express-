const express = require("express");
const os = require("os");
const path = require("path");

const logger = require("./middleware/logger");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 3000;

// Middleware global
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use("/", authRoutes);

// Routes
app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "home.txt");
  res.type("text/plain");
  res.sendFile(filePath);
});

app.get("/about", (req, res) => {
  res.send("Ini halaman tentang aplikasi Node.js sederhana yang dibuat dengan Express.js.");
});

app.get("/info", (req, res) => {
  const info = {
    platform: os.platform(),
    architecture: os.arch(),
    cpu: os.cpus()[0].model,
    totalMemory: os.totalmem(),
    uptime: os.uptime(),
  };
  res.json(info);
});

// Gunakan route modular
app.use("/contact", contactRoutes);

// Handle 404
app.use((req, res) => {
  res.status(404).send("Halaman tidak ditemukan");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
