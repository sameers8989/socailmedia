const jsonwebtoken = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(404).json({ message: "unauthorized" });
  }
  const CleanToken = jsonwebtoken.replace("Bearer ", "");
  jsonwebtoken.verify(CleanToken, "your-secret-key", (err, user) => {
    if (err) {
      return res.status(404).json({ message: "Token Verification Failed" });
    }
    req.user = user;
    next();
  });
};
