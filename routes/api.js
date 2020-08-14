const productDB = require("../models/productDB.js");
const Product = productDB.getModel();

function createProductXml(productData) {
    // Function for building XML from incoming productData

    // Start building the XML
    let productsXml = '<?xml version="1.0"?>' +
    '\n<products>';

    // Create products XML body
    for (product of productData){
        productsXml +=
        `\n<product>` +
        `\n\t<productID>${product._id}</productID>` +
        `\n\t<name>${product.name}</name>` +
        `\n\t<description>${product.description}</description>` +
        `\n\t<price>${product.price}</price>` +
        `\n\t<stock>${product.stock}</stock>` +
        "\n</product>";
    }

    // create ending products xml
    productsXml += "\n</products>";

    // return XML of given product data
    return productsXml;
};

module.exports.fetchProducts = async (req, res, next) => {
    // Get all products
    productData = await Product.find({});

    res.format({
        "application/json": () => {
            // Send JSON zip data
            res.json(productData);
        },
        "application/xml": () => {
            // Create product XML
            const productsXml = createProductXml(productData);

            // Set the Content-Type header and send
            // the XML response to the client
            res.type("application/xml");
            res.send(productsXml);
        },
    });
};

module.exports.fetchMatchingNameProducts = async (req, res, next) => {
    // get name params from URL
    const name = req.params.name;

    // Get all product(s) matching a specified name
    productData = await Product.find({ name });

    res.format({
        "application/json": () => {
            // Send JSON zip data
            res.json(productData);
        },
        "application/xml": () => {
            // Create product XML
            const productsXml = createProductXml(productData);

            // Set the Content-Type header and send
            // the XML response to the client
            res.type("application/xml");
            res.send(productsXml);
        },
    });
};

module.exports.fetchSpecPriceRangeProducts = async (req, res, next) => {
    // Get queries for price range
    let { low, high } = req.query;

    // convert queries to number
    low = Number(low);
    high = Number(high);

    console.log(low, high);

    // Get all products in a specified price range (between low and high)
    productData = await Product.find({ price: { $gte: low, $lte: high } });

    res.format({
        "application/json": () => {
            // Send JSON zip data
            res.json(productData);
        },
        "application/xml": () => {
            // Create product XML
            const productsXml = createProductXml(productData);

            // Set the Content-Type header and send
            // the XML response to the client
            res.type("application/xml");
            res.send(productsXml);
        },
    });
};