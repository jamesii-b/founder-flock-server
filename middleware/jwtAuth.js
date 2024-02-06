
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

async function authenticateToken(req, res, next) {
    try {
        const token = req.header('Authorization')
        const decoded = jwt.verify(token.toString(), process.env.JWT_SECRET)
        if (decoded) {
            next()
        } else {
            res.status(401).send("unauthorized")
        }
    } catch (e) {
        res.status(401).send(e)
    }
}

module.exports = authenticateToken;