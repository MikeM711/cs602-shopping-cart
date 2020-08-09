const userDB = require("../models/userDB.js");
const User = userDB.getModel();

module.exports.findUserByNameAndPw = async (req, res, next) => {
    let password = req.body.password;
    let username = req.body.username;

    //TODO: 1) get rid of the below, 2) and set password and username to CONST
    // username = "f";
    // password = "f";

    // Get the user data using a user's username and password
    userData = await User.find({ username, password });

    if (userData.length == 0) {
        // prompt user to log in again
        res.redirect("/login?err=true");
    } else if (userData[0].status == "user") {
        // The person who logged in is a user
        // create a session ID
        if (req.session.authenticated === undefined) {
            req.session.authenticated = true;
        }
        if (req.session.Id === undefined) {
            // Get the ID of the User
            req.session.Id = userData[0]._id;
        }
        res.redirect("/shop");
    } else {
        // The user who signed up is an admin
    }
};
