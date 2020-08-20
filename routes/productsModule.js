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
        productData = await Product.find({}).sort({ createdAt: -1 });
    }
    if (sortQuery == undefined) {
        productData = await Product.find({});
    }

    // Create data for HTML
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
    res.render("displayProductsView", { title: "CS602 Shop: Display", data: data });
};

module.exports.displaySingleProduct = async (req, res, next) => {
    // get the ID from the params
    const id = req.params.id;

    // fetch the product from the database using the ID
    let product
    try {
        product = await Product.findById(id);
        // Get all properties of the product for the view
        const { name, description, price, stock } = product;
        res.render("displaySingleProduct", {
            title: "Shop Product",
            name,
            description,
            price: price.toFixed(2),
            stock,
            id
        });
    } catch (err) {
        res.redirect("/404");
    }
};

module.exports.redirectSearch = async(req,res, next) => {
    // get search off of POST body and redirect the URL
    const search = req.body.search;
    res.redirect(`/shop/search?query=${search}`)
}

module.exports.searchProducts = async (req, res, next) => {
    // get search off of query
    const search = req.query.query;

    // if query is undefined redirect user to /shop
    if (search) {
        // search for a product by: name or description
        productData = await Product.find({ $text: { $search: search } });

        // Create data for HTML
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
        res.render("displayProductsView", { title: "CS602 Shop: Search", data: data });
    } else {
        // if query doesn't exist, redirect to the shop
        res.redirect('/shop');
    }
};
