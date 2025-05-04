const { validationResult } = require("express-validator");
const db = require("../config/db");

const handleContactPost = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, message } = req.body;

  const query = "INSERT INTO contacts (name, message) VALUES (?, ?)";
  db.query(query, [name, message], (err, result) => {
    if (err) {
      console.error("Gagal simpan ke database:", err);
      return res.status(500).json({ error: "Gagal menyimpan data kontak." });
    }

    res.json({
      success: true,
      message: "Data berhasil disimpan ke database!",
      insertedId: result.insertId,
    });
  });
};

const getAllContacts = (req, res) => {
  const query = "SELECT id, name, message, created_at FROM contacts ORDER BY created_at DESC";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Gagal ambil data dari database:", err);
      return res.status(500).json({ error: "Gagal mengambil data kontak." });
    }

    res.json({
      success: true,
      data: results,
    });
  });
};

const getContactById = (req, res) => {
  const contactId = req.params.id;

  const query = "SELECT id, name, message, created_at FROM contacts WHERE id = ?";
  db.query(query, [contactId], (err, results) => {
    if (err) {
      console.error("Gagal ambil data:", err);
      return res.status(500).json({ error: "Gagal mengambil data kontak." });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Kontak tidak ditemukan." });
    }

    res.json({
      success: true,
      data: results[0],
    });
  });
};

const updateContact = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const contactId = req.params.id;
  const { name, message } = req.body;

  const query = "UPDATE contacts SET name = ?, message = ? WHERE id = ?";
  db.query(query, [name, message, contactId], (err, result) => {
    if (err) {
      console.error("Gagal update data:", err);
      return res.status(500).json({ error: "Gagal mengupdate data kontak." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Kontak tidak ditemukan." });
    }

    res.json({
      success: true,
      message: "Data kontak berhasil diperbarui.",
    });
  });
};

const deleteContact = (req, res) => {
  const contactId = req.params.id;

  const query = "DELETE FROM contacts WHERE id = ?";
  db.query(query, [contactId], (err, result) => {
    if (err) {
      console.error("Gagal hapus data:", err);
      return res.status(500).json({ error: "Gagal menghapus data kontak." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Kontak tidak ditemukan." });
    }

    res.json({
      success: true,
      message: "Kontak berhasil dihapus.",
    });
  });
};

module.exports = {
  handleContactPost,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};
