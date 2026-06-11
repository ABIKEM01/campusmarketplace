isAuthenticated = (req, res, next) => {
  if (req.session.passport?.user) {
    next();
  } else {
    res.status(403).json({ message: "User not logged in." });
  }
};

module.exports = { isAuthenticated };
