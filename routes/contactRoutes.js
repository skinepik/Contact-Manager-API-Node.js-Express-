// const express = require("express");
// const router = express.Router();
// const { getAllContacts, handleContactPost, getContactById, updateContact, deleteContact } = require("../controllers/contactController");
// const { body } = require("express-validator");
// const verifyToken = require("../middleware/verifyToken");

// // Validasi input sebelum masuk ke controller
// const contactValidation = [
//   body("name").notEmpty().withMessage("Name wajib diisi.").isLength({ min: 3 }).withMessage("Name minimal 3 karakter."),
//   body("message").notEmpty().withMessage("Message wajib diisi.").isLength({ max: 255 }).withMessage("Message maksimal 255 karakter."),
// ];

// router.get("/", getAllContacts);
// router.post("/", contactValidation, handleContactPost);
// router.get("/:id", getContactById);
// router.put("/:id", contactValidation, updateContact);
// router.delete("/:id", deleteContact);
// router.get("/", verifyToken, getAllContacts);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { handleContactPost, getAllContacts } = require("../controllers/contactController");
// const verifyToken = require("../middleware/verifyToken");

// // Hanya user login yang boleh akses
// router.get("/", verifyToken, getAllContacts);
// router.post("/", verifyToken, handleContactPost);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { handleContactPost, getAllContacts } = require("../controllers/contactController");
const verifyToken = require("../middleware/verifyToken");
const isAdmin = require("../middleware/isAdmin");

// Lindungi route dengan verifyToken
router.get("/", verifyToken, isAdmin, getAllContacts);

router.post("/", verifyToken, isAdmin, [body("name").notEmpty().withMessage("Nama wajib diisi"), body("message").notEmpty().withMessage("Pesan wajib diisi")], handleContactPost);

module.exports = router;
