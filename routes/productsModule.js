const productDB = require("../models/productDB.js");
const Product = productDB.getModel();

module.exports.displayProducts = async (req, res, next) => {
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
        // For all descriptions, if it is long (more than 70 chars), we'll add a ... after it
        const CHARS = 90;
        if (Product.description.length > CHARS) {
            // To make things look nice, we will find the last space before the CHARS'th character
            const idxSpace = Product.description.slice(0, CHARS).lastIndexOf(" ");
            Product.description = Product.description.slice(0, idxSpace) + "...";
        }

        return {
            id: Product.id,
            name: Product.name,
            description: Product.description,
            price: Product.price.toFixed(2),
            stock: Product.stock,
        };
    });
    res.render("displayProductsView", { title: "Shop Display", data: data });
};

module.exports.displaySingleProduct = async (req, res, next) => {
    // get the ID from the params
    const id = req.params.id;

    // fetch the product from the database using the ID
    const product = await Product.findById(id);

    if (!product) {
        res.render("404");
    } else {
        // Get all properties of the product for the view
        const { name, description, price, stock } = product;
        res.render("displaySingleProduct", {
            name,
            description,
            price: price.toFixed(2),
            stock,
        });
    }
};

module.exports.searchProducts = async (req, res, next) => {
    // get search off of POST body
    const search = req.body.search;

    // search for a product by: name or description
    productData = await Product.find({ $text: { $search: search } });

    // DATA FOR HTML
    const data = await productData.map((Product) => {
        // For all descriptions, if it is long (more than 70 chars), we'll add a ... after it
        const CHARS = 90;
        if (Product.description.length > CHARS) {
            // To make things look nice, we will find the last space before the CHARS'th character
            const idxSpace = Product.description.slice(0, CHARS).lastIndexOf(" ");
            Product.description = Product.description.slice(0, idxSpace) + "...";
        }

        return {
            id: Product.id,
            name: Product.name,
            description: Product.description,
            price: Product.price.toFixed(2),
            stock: Product.stock,
        };
    });
    res.render("displayProductsView", { title: "Shop Display", data: data });
};
