const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded.user; 
        next();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
