// models/UserMap.js
class UserMap {
    constructor(uID, socketID) {
        this.uID = uID;
        this.socketID = socketID;
    }
    theMap() {
        return {
            "uID": this.uID,
            "socketID": this.socketID
        };
    }
}

module.exports = UserMap;
