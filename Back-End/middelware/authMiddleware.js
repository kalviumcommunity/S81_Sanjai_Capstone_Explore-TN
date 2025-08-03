const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


exports.isAuthenticatedUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // Do not include password

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    next(); // move to next middleware or route
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
