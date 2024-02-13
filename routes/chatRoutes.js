const express = require("express")
const getInitialChat = require("../controllers/chats/getInitialChats")
const getSpecificChat = require("../controllers/chats/getAllChats")
const router = express.Router()

router.get("/chats/init", (req, res) => {
    try {
        getInitialChat(req, res);
    } catch (err) {
        console.log(err)
        res.status(505).json({ message: "Internal  Error" })
    }
})


router.post("/chats/specific", (req, res) => {
    try {

        getSpecificChat(req, res);
    } catch (err) {
        console.log(err)
        res.status(505).json({ message: "Internal Server Error" })
    }
});

module.exports = router;