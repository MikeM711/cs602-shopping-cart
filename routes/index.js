const express = require('express');
const router = express.Router();

// other modules

const productsModule = require("./productsModule");

const displayProducts 	= productsModule.displayProducts;
const displaySingleProduct  = productsModule.displaySingleProduct;

router.get('/', (req, res) => {
    res.redirect('/shop')
})

router.get('/shop', displayProducts);
router.get('/shop/:id', displaySingleProduct);

// Admin permissions to edit
router.get('/product/edit/:id', (req,res) => {
    const id = req.params.id
    res.render('editProductView', {id:id})
})

router.get('/product/delete/:id', (req,res) => {
    const id = req.params.id;
    res.render('deleteProductView', {id:id});
})

router.post('/validate-user', (req,res) => {
    console.log('hit here')
    // perform user validation here
    if (true) {
        res.redirect('/shop');
    } else {
        // Error: login failed, try again
        // do login again
    }
})

router.get('/login', (req,res) => {
    res.render('login')
})

module.exports = router;