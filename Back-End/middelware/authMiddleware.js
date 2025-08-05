const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // ✅ verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ find user
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    next(); // ✅ proceed to next middleware
  } catch (err) {
    console.error(err);

    // ✅ Handle token expired separately
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Session expired. Please login again." });
    }

    // ✅ Other errors
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
