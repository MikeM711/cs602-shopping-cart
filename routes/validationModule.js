module.exports.authGuard = async (req, res, next) => {
    // Guard against non-authenticated users
    if (req.session.authenticated) {
        next();
    } else {
        // if not authenticated, kick user back to login screen
        res.redirect("/login");
    }
};
