const userDB = require("../models/userDB.js");
const User = userDB.getModel();

module.exports.findUserByNameAndPw = async (req, res, next) => {
    const password = req.body.password;
    const username = req.body.username;

    // Get the user data using a user's username and password
    userData = await User.find({ username, password });

    if (userData.length == 0) {
        // prompt user to log in again
        res.redirect("/login?err=true");
    } else if (userData[0].status == "user") {
        // create a session ID
        if (req.session.authenticated === undefined) {
            req.session.authenticated = true;
        }
        if (req.session.orderList === undefined) {
            req.session.orderList = [];
        }
        res.redirect("/shop");
    } else {
        // The user who signed up is an admin
    }
};
