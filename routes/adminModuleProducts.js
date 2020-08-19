const userDB = require("../models/userDB.js");
const User = userDB.getModel();

const productDB = require("../models/productDB.js");
const Product = productDB.getModel();

module.exports.displayAdminPanel = async (req, res, next) => {
    res.render("adminPanel", { title: "Admin Control Panel" });
};

module.exports.displayAdminProducts = async (req, res, next) => {
    // Get all of the Product data from within the Product collection
    productData = await Product.find({});

    // Data for the view
    const data = await productData.map((Product) => {
        return {
            id: Product.id,
            name: Product.name,
            description: Product.description,
            price: Product.price.toFixed(2),
            stock: Product.stock,
        };
    });
    res.render("adminDisplayProductsView", {
        title: "Admin Control Panel: Products",
        data: data,
    });
};

module.exports.displayUpdateProduct = async (req, res, next) => {
    // Get ID param
    const id = req.params.id;

    // fetch the product from the database using the ID
    const product = await Product.findById(id);

    if (!product) {
        res.render("404");
    } else {
        // Get all properties of the product for the view
        const { name, description, price, stock } = product;
        res.render("adminUpdateProductView", {
            title: "Update this product",
            name,
            description,
            price: price.toFixed(2),
            stock,
            id,
        });
    }
};

module.exports.adminUpdateProduct = async (req, res, next) => {
    // Get all inputs from req.body
    const { name, price, stock, description, id } = req.body;

    // update the product with these inputs
    await Product.updateOne(
        { _id: id },
        { $set: { name, description, price, stock } }
    );

    res.redirect("/admin/products");
};

module.exports.displayAddProduct = async (req, res, next) => {
    // Display Admin's Add Product View
    res.render("adminAddProductView", { title: "Add Product" });
};

module.exports.adminAddProduct = async (req, res, next) => {
    // Get all inputs from req.body
    const { name, price, stock, description } = req.body;

    // Create a new Product using the Product Model
    const product = new Product({ name, price, stock, description });

    // add the product to the database
    await product.save();

    res.redirect("/admin/products");
};

module.exports.displayDeleteProduct = async (req, res, next) => {
    // Get id of product you want to delete
    const id = req.params.id;

    // fetch the product from the database using the ID
    const product = await Product.findById(id);

    if (!product) {
        res.render("404");
    } else {
        // Get all properties of the product for the view
        const { name, description, price, stock } = product;
        res.render("adminDeleteProductView", {
            title: "Delete this product",
            name,
            description,
            price: price.toFixed(2),
            stock,
            id,
        });
    }
};

module.exports.adminDeleteProduct = async (req, res, next) => {
    // get ID from params
    const id = req.params.id;
    // delete product from database
    await Product.deleteOne({ _id: id });

    res.redirect("/admin/products");
};
