const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const chatSchema = new mongoose.Schema({
    sender: {
        type: ObjectId,
        required: true,
        ref: 'user',
    },
    receiver: {
        type: ObjectId,
        required: true,
        ref: 'user',
    },
    message: {
        type: String,
        required: true,
    },
    sentAt: {
        type: Date,
        default: Date.now()
    },
    seen: {
        type: Boolean,
        default: false,
    },

})

const chatModel = mongoose.model('Chat', chatSchema)
module.exports = chatModel