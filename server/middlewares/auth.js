const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    console.log("FETCHING TOKEN");

    // Extract token from the Authorization header
    const token = req.headers.authorization?.replace("Bearer ", "");

    console.log("Token extracted:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // Store the decoded user data
    req.user = decoded;

    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error("Error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
