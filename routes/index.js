const express = require("express");
const router = express.Router();

const productsModule        = require("./productsModule");
const usersModule           = require("./usersModule");
const validationModule      = require("./validationModule");
const userCartModule        = require("./userCartModule");
const adminModuleProducts   = require("./adminModuleProducts");
const adminModuleCustomers  = require("./adminModuleCustomers");
const api                   = require("./api");

// products module
const displayProducts       = productsModule.displayProducts;
const displaySingleProduct  = productsModule.displaySingleProduct;
const searchProducts        = productsModule.searchProducts;
const redirectSearch        = productsModule.redirectSearch;

// login
const signIn        = usersModule.signIn;
const signOut       = usersModule.signOut;
const displayLogin  = usersModule.displayLogin;

// auth guard
const authGuardUser     = validationModule.authGuardUser;
const authGuardAdmin    = validationModule.authGuardAdmin;

// User cart functions
const displayUserCart   = userCartModule.displayUserCart;
const addToUserCart     = userCartModule.addToUserCart;

// Admin Module - Products
const displayAdminPanel     = adminModuleProducts.displayAdminPanel;
const displayAdminProducts  = adminModuleProducts.displayAdminProducts;
const displayUpdateProduct  = adminModuleProducts.displayUpdateProduct;
const adminUpdateProduct    = adminModuleProducts.adminUpdateProduct;
const displayAddProduct     = adminModuleProducts.displayAddProduct;
const adminAddProduct       = adminModuleProducts.adminAddProduct;
const displayDeleteProduct  = adminModuleProducts.displayDeleteProduct;
const adminDeleteProduct    = adminModuleProducts.adminDeleteProduct;

// Admin Module - Customers
const displayAdminCustomers         = adminModuleCustomers.displayAdminCustomers;
const displayCustomerOrders         = adminModuleCustomers.displayCustomerOrders;
const displayUpdateCustomerOrder    = adminModuleCustomers.displayUpdateCustomerOrder;
const adminUpdateCustomerOrder      = adminModuleCustomers.adminUpdateCustomerOrder;
const displayDeleteCustomerOrder    = adminModuleCustomers.displayDeleteCustomerOrder;
const adminDeleteCustomerOrder      = adminModuleCustomers.adminDeleteCustomerOrder;

// API
const fetchProducts                 = api.fetchProducts;
const fetchMatchingNameProducts     = api.fetchMatchingNameProducts;
const fetchSpecPriceRangeProducts   = api.fetchSpecPriceRangeProducts;

// Routes

router.get("/", (req, res) => { res.redirect("/shop")});

// Shop Routes
router.get("/shop",                 authGuardUser, displayProducts);
router.post("/shop/search",         authGuardUser, redirectSearch);
router.get("/shop/search",          authGuardUser, searchProducts);

router.get("/shop/product/:id",     authGuardUser, displaySingleProduct);

router.get("/shop/cart",            authGuardUser, displayUserCart);
router.post("/shop/cart",           authGuardUser, addToUserCart);

// Login Routes
router.get("/login",    displayLogin);
router.post("/login",   signIn);
router.get("/logout",   signOut);

// Admin Routes
router.get("/admin",            authGuardAdmin, displayAdminPanel);
router.get("/admin/products",   authGuardAdmin, displayAdminProducts);

router.get("/admin/product/update/:id", authGuardAdmin, displayUpdateProduct);
router.post("/admin/product/update",    authGuardAdmin, adminUpdateProduct);

router.get("/admin/product/add",    authGuardAdmin, displayAddProduct);
router.post("/admin/product/add",   authGuardAdmin, adminAddProduct);

router.get("/admin/product/delete/:id",     authGuardAdmin, displayDeleteProduct);
router.post("/admin/product/delete/:id",    authGuardAdmin, adminDeleteProduct);

router.get("/admin/customers",      authGuardAdmin, displayAdminCustomers);
router.get("/admin/customer/:id",   authGuardAdmin, displayCustomerOrders);

router.get("/admin/customer/:userid/update/:prodid",    authGuardAdmin, displayUpdateCustomerOrder);
router.post("/admin/customer/update",                   authGuardAdmin, adminUpdateCustomerOrder);

router.get("/admin/customer/:userid/delete/:prodid",    authGuardAdmin, displayDeleteCustomerOrder);
router.post("/admin/customer/delete",                   authGuardAdmin, adminDeleteCustomerOrder);

// API routes
router.get("/api/products",         fetchProducts);
router.get("/api/products/:name",   fetchMatchingNameProducts);
router.get("/api/price",            fetchSpecPriceRangeProducts);

module.exports = router;
