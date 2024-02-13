async function logoutController(res) {
    try {
        res.clearCookie("jwt");
        res.cookie("jwt", "", {
            maxAge: 0,
        });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


module.exports = logoutController;