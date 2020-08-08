const express = require("express");
const router = express.Router();

// other modules

const productsModule = require("./productsModule");
const usersModule = require("./usersModule");
const validationModule = require("./validationModule");

const displayProducts       = productsModule.displayProducts;
const displaySingleProduct  = productsModule.displaySingleProduct;
const searchProducts        = productsModule.searchProducts;

const findUserByNameAndPw   = usersModule.findUserByNameAndPw;

const authGuard             = validationModule.authGuard;

router.get("/", (req, res) => { res.redirect("/shop")});

router.get("/shop",         authGuard, displayProducts);
router.get("/shop/:id",     authGuard, displaySingleProduct);
router.post("/shop/search", authGuard, searchProducts);

router.get("/login", (req, res) => {
    const err = req.query.err;
    res.render("login", { layout: "nonAuth", err, title: "CS602 Shopping Cart" });
});
router.post("/login", findUserByNameAndPw);

router.get("/logout", (req, res) => {
    // If a user logs out, change session values to undefined
    req.session.authenticated = undefined;
    req.session.orderList = undefined;
    // Redirect the user to the login
    res.redirect("/login");
});

// Admin permissions to edit
router.get("/product/edit/:id", (req, res) => {
    const id = req.params.id;
    res.render("editProductView", { id: id });
});

router.get("/product/delete/:id", (req, res) => {
    const id = req.params.id;
    res.render("deleteProductView", { id: id });
});

module.exports = router;
