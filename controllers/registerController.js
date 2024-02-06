const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
async function registerController(_email, _pass, _name, _phone_num) {
    const salt = await bcrypt.genSalt(10);
    const _hashedPass = await bcrypt.hash(_pass, salt);

    const newUser = new userModel({
        name: _name,
        email: _email,
        number: _phone_num,
        password: _hashedPass,
    })
    try {
        await newUser.save()
        console.log("DONE")
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = registerController;