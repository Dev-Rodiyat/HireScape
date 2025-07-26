const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { User } = require("../model/userModel");

const protectUser = asyncHandler(async (req, res, next) => {
  let token;

  // Check for Bearer token in header or token in cookie
  if (
    req.headers.authorization?.startsWith("Bearer") ||
    req.cookies?.token
  ) {
    try {
      // Extract token
      token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

      if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user
      const foundUser = await User.findById(decoded.id).select("-password");
      if (!foundUser) {
        return res.status(401).json({ message: "Unauthorized: User not found" });
      }

      // Attach user to request
      req.user = foundUser;
      next();
    } catch (err) {
      console.error("Token verification error:", err);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }
});

module.exports = { protectUser };
