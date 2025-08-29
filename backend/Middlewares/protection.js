const jwt = require('jsonwebtoken');
require("dotenv").config();

const routeProtector = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  
        if (req.body.UserName && decoded.UserName !== req.body.UserName) {
            return res.status(403).json({ message: "Unauthorized: User mismatch" });
        }

        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = { routeProtector };
