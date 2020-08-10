const userDB = require("../models/userDB.js");
const User = userDB.getModel();

module.exports.signIn = async (req, res, next) => {
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
            // A successful login has true authentication
            req.session.authenticated = true;
        }
        if (req.session.Id === undefined) {
            // Session will store the ID
            req.session.Id = userData[0]._id;
        }
        if (req.session.status === undefined) {
            // The session status is the user
            req.session.status = "user";
        }
        res.redirect("/shop");
    } else if (userData[0].status == "admin") {
        // The user who signed up is an admin
        // create a session ID
        if (req.session.authenticated === undefined) {
            // A successful login has true authentication
            req.session.authenticated = true;
        }
        if (req.session.Id === undefined) {
            // Session will store the ID
            req.session.Id = userData[0]._id;
        }
        if (req.session.status === undefined) {
            // The session status is the user
            req.session.status = "admin";
        }
        res.redirect("/admin");
    }
};

module.exports.signOut = async (req, res, next) => {
    // If a user logs out, change session values to undefined
    req.session.authenticated = undefined;
    req.session.Id = undefined;
    req.session.status = undefined;
    // Redirect the user to the login
    res.redirect("/login");
}

module.exports.displayLogin = async (req, res, next) => {
    // If there is an error when signing in, show the error 
    const err = req.query.err;
    res.render("login", { layout: "nonAuth", err, title: "CS602 Shopping Cart" });
}