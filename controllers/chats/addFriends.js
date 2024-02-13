const User = require('../../models/userModel');

async function addFriend(req, res) {
    try {
        console.log(req.body.userID, req.body.friendID)
        const { userID, friendID } = req.body;

        if (!userID || !friendID) {
            return res.status(400).json({ message: "Both userID and friendID are required" });
        }

        // Check if the user exists
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the friend exists
        const friend = await User.findById(friendID);
        if (!friend) {
            return res.status(404).json({ message: "Friend not found" });
        }

        // Check if the friend is already added
        if (user.friends.includes(friendID)) {
            return res.status(400).json({ message: "Friend already added" });
        }

        // Add friend to user's friend list
        user.friends.push(friendID);
        await user.save();

        res.status(200).json({ message: "Friend added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = addFriend;
