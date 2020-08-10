const express = require("express");
const router = express.Router();

const productsModule        = require("./productsModule");
const usersModule           = require("./usersModule");
const validationModule      = require("./validationModule");
const userCartModule        = require("./userCartModule");
const adminModuleProducts   = require("./adminModuleProducts");
const adminModuleCustomers = require("./adminModuleCustomers");

const displayProducts       = productsModule.displayProducts;
const displaySingleProduct  = productsModule.displaySingleProduct;
const searchProducts        = productsModule.searchProducts;
const redirectSearch        = productsModule.redirectSearch;

const signIn        = usersModule.signIn;
const signOut       = usersModule.signOut;
const displayLogin  = usersModule.displayLogin;

const authGuardUser     = validationModule.authGuardUser;
const authGuardAdmin    = validationModule.authGuardAdmin;

// User cart functions
const displayUserCart   = userCartModule.displayUserCart;
const addToUserCart     = userCartModule.addToUserCart;

const displayAdminPanel     = adminModuleProducts.displayAdminPanel;
const displayAdminProducts  = adminModuleProducts.displayAdminProducts;
const displayUpdateProduct  = adminModuleProducts.displayUpdateProduct;
const adminUpdateProduct    = adminModuleProducts.adminUpdateProduct;
const displayAddProduct     = adminModuleProducts.displayAddProduct;
const adminAddProduct       = adminModuleProducts.adminAddProduct;
const displayDeleteProduct  = adminModuleProducts.displayDeleteProduct;
const adminDeleteProduct    = adminModuleProducts.adminDeleteProduct;

const displayAdminCustomers = adminModuleCustomers.displayAdminCustomers;
const displayCustomerOrders = adminModuleCustomers.displayCustomerOrders;

router.get("/", (req, res) => { res.redirect("/shop")});

router.get("/shop",                 authGuardUser, displayProducts);
router.post("/shop/search",         authGuardUser, redirectSearch);
router.get("/shop/search",          authGuardUser, searchProducts);

router.get("/shop/product/:id",     authGuardUser, displaySingleProduct);

router.get("/shop/cart",            authGuardUser, displayUserCart);
router.post("/shop/cart",           authGuardUser, addToUserCart);

router.get("/login",    displayLogin);
router.post("/login",   signIn);
router.get("/logout",   signOut);

router.get("/admin",            authGuardAdmin, displayAdminPanel);
router.get("/admin/products",   authGuardAdmin, displayAdminProducts);

// Admin permissions to update
router.get("/admin/product/update/:id", authGuardAdmin, displayUpdateProduct);
router.post("/admin/product/update",    authGuardAdmin, adminUpdateProduct);

router.get("/admin/product/add",    authGuardAdmin, displayAddProduct);
router.post("/admin/product/add",   authGuardAdmin, adminAddProduct);

router.get("/admin/product/delete/:id",     authGuardAdmin, displayDeleteProduct);
router.post("/admin/product/delete/:id",    authGuardAdmin, adminDeleteProduct);

router.get("/admin/customers",      authGuardAdmin, displayAdminCustomers);
router.get("/admin/customer/:id",   authGuardAdmin, displayCustomerOrders);

module.exports = router;
