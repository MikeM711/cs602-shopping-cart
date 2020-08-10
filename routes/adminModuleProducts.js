const userDB = require("../models/userDB.js");
const User = userDB.getModel();

const productDB = require("../models/productDB.js");
const Product = productDB.getModel();

module.exports.displayAdminPanel = async (req, res, next) => {
    res.render("adminPanel", { title: "Admin Control Panel" });
};

module.exports.displayAdminProducts = async (req, res, next) => {
    // Get all of the Product data from within the Product collection
    // Depending on sort criteria
    const sortQuery = req.query.sort;
    let productData;

    if (sortQuery == "low-to-high") {
        productData = await Product.find({}).sort({ price: 1 });
    } else if (sortQuery == "high-to-low") {
        productData = await Product.find({}).sort({ price: -1 });
    } else if (sortQuery == "alphabetical") {
        productData = await Product.find({}).sort({ name: 1 });
    } else if (sortQuery == "newest") {
        productData = await Product.find({}).sort({ updatedAt: 1 });
    }
    if (sortQuery == undefined) {
        productData = await Product.find({});
    }

    // DATA FOR HTML
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

    // console.log(name, price, stock, description, id)
    res.redirect("/admin/products");
};

module.exports.displayAddProduct = async (req, res, next) => {
    res.render("adminAddProductView", { title: "Add Product" });
};

module.exports.adminAddProduct = async (req, res, next) => {
    // Get all inputs from req.body
    const { name, price, stock, description } = req.body;

    const product = new Product({ name, price, stock, description });

    // add the product to the database
    await product.save();

    // console.log(name, price, stock, description, id)
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
