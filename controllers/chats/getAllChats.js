const Chat = require('../../models/chatModel');
async function getSpecificChat(req, res) {
    try {

        const userID = req.body.userID;
        const friendID = req.body.friendID;
        console.log(userID, friendID)
        const chats = await Chat.find({ $or: [{ senderID: userID, receiverID: friendID }, { senderID: friendID, receiverID: userID }] });
        console.log(chats);
        res.json(chats);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = getSpecificChat;