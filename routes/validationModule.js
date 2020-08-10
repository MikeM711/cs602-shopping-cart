module.exports.authGuardUser = async (req, res, next) => {
    // Guard against non-authenticated users
    // Only allow users to enter these routes
    if (req.session.authenticated && req.session.status == "user") {
        // Only users may pass
        next();
    } else if (req.session.authenticated && req.session.status == "admin") {
        // If admin, redirect admin to /admin route
        res.redirect("/admin")
    } else {
        // if not authenticated, kick user back to login screen
        res.redirect("/login");
    }
};

module.exports.authGuardAdmin = async (req, res, next) => {
    // Guard against non-admins
    // Only allow users to enter these routes
    if (req.session.authenticated && req.session.status == "admin") {
        // Only admins may pass
        next();
    } else if (req.session.authenticated && req.session.status == "user") {
        // If user, redirect user to /shop route
        res.redirect("/shop")
    } else {
        // if not authenticated, kick user back to login screen
        res.redirect("/login");
    }
};
