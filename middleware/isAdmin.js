const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Hanya admin yang boleh mengakses resource ini." });
  }
  next();
};

module.exports = isAdmin;
