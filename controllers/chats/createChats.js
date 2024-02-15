const Chat = require('../../models/chatModel');
async function createChat(senderID, receiverID, message) {
    try {
        const chat = new Chat({ senderID: senderID, receiverID: receiverID, message: message });
        await chat.save();
    } catch (e) {
        console.log("eror", e)
        throw "Can't save the chat";
    }
}

module.exports = createChat;