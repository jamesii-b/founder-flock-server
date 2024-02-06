const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
async function loginController(_email, _pass) {
    try {
        const user = await userModel.findOne({ email: _email });
        if (!user) {
            return false;
        } else {
            const passwordMatch = await bcrypt.compare(_pass, user.password);
            if (passwordMatch) {
                return { "status": true, "id": user._id.toString() };
            } else {
                return false;
            }
        }
    } catch (error) {

        return false;

    }
}


module.exports = loginController;