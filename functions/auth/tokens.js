const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

async function generateTokens(email_id, uuid) {
    console.log(uuid)
    try {
        const token = await jwt.sign(
            {
                data: uuid,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        refresh_uuid = await jwt.sign(
            {
                data: uuid,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        return token;
        const user = User.findOne({ email: email_id });
        user.tokens = user.tokens.concat({ token });
        user.save();
    } catch (error) {
        return { error };
    }
}


module.exports = generateTokens;