const bcrypt = require('bcrypt');
const User = require('../../models/userModel');
async function registerController(_email, _pass) {
    try{

        const salt = await bcrypt.genSalt(10);
        const _hashedPass = await bcrypt.hash(_pass, salt);
        const newUser = new User({
            email: _email,
            password: _hashedPass,
        });
        console.log(newUser)
        try {
            await newUser.save()
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }catch(err){
        console.log(err)
        throw "Can't register"
    }
}

module.exports = registerController;