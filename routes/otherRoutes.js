const express = require("express");
const getFriends = require("../controllers/chats/getFriends");
const addFriend = require("../controllers/chats/addFriends");
const router = express.Router()


router.get("/friends/:userID", (req, res) => {
    getFriends(req, res);
});

router.post("/addfriend",(req,res)=>{
    addFriend(req,res);
})

module.exports = router;