const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const loginLimiter = require('../middleware/requestLimiter');
const generateTokens = require('../functions/auth/tokens');

router.post("/login", loginLimiter, async (req, res) => {
    console.log("login===", req.body);
    console.log(req.body.email);
    console.log(req.body.password);
    doc = await loginController(req.body.email, req.body.password);
    console.log(doc)
    if (doc["status"]) {
        console.log(doc["id"])
        user = await generateTokens(req.body.email, doc["id"]);
        res.status(200).send(user);
    } else { res.status(403).json({ message: "Email id or password doesn't match", type: "error" }) };
});

router.post("/register", (req, res) => {
    console.log(req.body)
    console.log(req.body.email)
    console.log(req.body.password)
    if (req.body != null) {
        if (registerController(req.body.email, req.body.password)) {
            res.json({ "status": "Registered" })
        }
        else {
            res.json({ "status": "Technical Error" })
        }
    } else {
        res.json({ "status": "Syntax Error" })
    }
})

module.exports = router;