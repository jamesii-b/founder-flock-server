const express = require('express');
const router = express.Router();
const registerController = require('../controllers/auth/registerController');
const loginController = require('../controllers/auth/loginController');
const loginLimiter = require('../middleware/requestLimiter');
const authenticateToken = require('../middleware/jwtAuth');
const logoutController = require('../controllers/auth/logoutController');

router.post("/login", loginLimiter, async (req, res) => {
    if (req.body.email == null || req.body.password == null || req.body == null) {
        res.status(403).json({ message: "Email id or password doesn't match", type: "error" });
    } else {
        loginController(req.body.email, req.body.password, res);
    }
});

router.post("/register", (req, res) => {
    if (req.body != null) {
        if (registerController(req.body.email, req.body.password)) {
            res.status(200).json({ "status": "Registered" })
        }
        else {
            res.status(500).json({ "status": "Internal Server Error" })
        }
    } else {
        res.status(300).json({ "status": "Syntax Error" })
    }
})

router.post("/logout", authenticateToken, (req, res) => {
    logoutController(res)
})

module.exports = router;