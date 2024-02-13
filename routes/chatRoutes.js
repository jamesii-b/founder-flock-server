const express=require("express")
const getInitialChats = require("../controllers/chats/getInitialChats")
const router=express.Router()

router.get("/chats",(req,res)=>{
    getInitialChats(req,res);
})