const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

async function generateTokens(uuid) {
    try {
        const token = await jwt.sign(
            {
                data: uuid,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        return token;
    } catch (error) {
        return { error };
    }
}
function validateToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}

module.exports = { generateTokens, validateToken };