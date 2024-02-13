const User = require('../../models/userModel');
const mongoose = require('mongoose')
async function getFriends(req, res) {

    try {
        const userID = req.params.userID;
        const friends = await User.find({ _id: userID }).populate({
            path: 'friends',
            select: '_id email profile_pic'
        }).select("friends -_id");
        res.json(friends);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = getFriends;
