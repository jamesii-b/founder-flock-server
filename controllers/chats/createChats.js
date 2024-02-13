async function createChat(senderID, receiverID, message) {
    try {
        const chat = new Chat({ senderID, receiverID, message });
        await chat.save();
    } catch (e) {
        throw "Can't save the chat";
    }
}

module.exports = createChat;