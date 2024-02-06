const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: { type: String },
    number: { type: String },
    email: { type: String },
    profile_pic: {
        type: String,
        default: "https://drgsearch.com/wp-content/uploads/2020/01/no-photo.png"
    },
    status: {
        type: String,
        default: "Hey there! I am using Cypher."
    },
    password: { type: String },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
});


module.exports = mongoose.model('UserModel', userSchema)