const bcrypt = require('bcrypt');
const userModel = require('../../models/userModel');
async function registerController(_email, _pass) {
    const salt = await bcrypt.genSalt(10);
    const _hashedPass = await bcrypt.hash(_pass, salt);
    const newUser = new userModel({
        email: _email,
        password: _hashedPass,
    })
    try {
        await newUser.save()
        return true
    } catch (error) {
        return false
    }
}

module.exports = registerController;