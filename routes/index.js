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
const {
  displayProducts,
  displaySingleProduct,
  searchProducts,
  redirectSearch,
} = productsModule;

// login
const { 
    signIn,
    signOut,
    displayLogin,
} = usersModule;

// auth guard
const {
    authGuardUser,
    authGuardAdmin,
} = validationModule;

// User cart functions
const {
    displayUserCart,
    addToUserCart,
} = userCartModule;

// Admin Module - Products
const {
  displayAdminPanel,
  displayAdminProducts,
  displayUpdateProduct,
  adminUpdateProduct,
  displayAddProduct,
  adminAddProduct,
  displayDeleteProduct,
  adminDeleteProduct,
} = adminModuleProducts;

// Admin Module - Customers
const {
  displayAdminCustomers,
  displayCustomerOrders,
  displayUpdateCustomerOrder,
  adminUpdateCustomerOrder,
  displayDeleteCustomerOrder,
  adminDeleteCustomerOrder,
} = adminModuleCustomers;

// API
const {
  fetchProducts,
  fetchMatchingNameProducts,
  fetchSpecPriceRangeProducts,
} = api;

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
