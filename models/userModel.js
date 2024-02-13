const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    profile_pic: {
        type: String,
        default: "https://drgsearch.com/wp-content/uploads/2020/01/no-photo.png"
    },
    password: { type: String, required: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});


const userModel = mongoose.model('User', userSchema)
module.exports = userModel;