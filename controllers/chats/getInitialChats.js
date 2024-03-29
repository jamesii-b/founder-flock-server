const Chat = require('../../models/chatModel');
async function getInitialChat(req, res) {
    try {
        const chats = await Chat.find({})
            .select('message sentAt senderID receiverID')
            .populate({
                path: 'senderID',
                model: 'User',
                select: 'name profile_pic',
            })
            .populate({
                path: 'receiverID',
                model: 'User',
                select: 'name profile_pic',
            })
            .sort({ sentAt: -1 })
            .limit(10); // Limiting to the latest 10 chats, adjust as needed

        res.status(200).json({ chats });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = getInitialChat;