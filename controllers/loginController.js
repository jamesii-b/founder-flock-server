const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateTokens } = require("../utils/jwt-tokens");
async function loginController(_email, _pass, res) {
    try {
        const user = await userModel.findOne({ email: _email });
        const passwordMatch = await bcrypt.compare(_pass, user?.password || "");
        if (!user || !passwordMatch) {
            return res.status(403).json({ message: "Email id or password doesn't match", type: "error" });
        } else {
            res.cookie(process.env.JWT_HEADER, generateTokens(user._id), {
                maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true,
            }).status(200).send(user);
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });

    }
}


module.exports = loginController;