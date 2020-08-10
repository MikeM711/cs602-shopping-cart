const productDB = require("../models/productDB.js");
const Product = productDB.getModel();

const userDB = require("../models/userDB.js");
const User = userDB.getModel();

module.exports.addToUserCart = async (req, res, next) => {
    // Get quantity and id off of POST body
    const quantity = Number(req.body.quantity);
    const productId = req.body.id;

    // Find the product that we wish to include in the User's order list
    const productData = await Product.findById(productId);

    if (productData.stock >= quantity && quantity > 0) {
        // A valid quantity purchase
        const totalPrice = quantity * productData.price;

        // Get the User ID from req.session
        const userId = req.session.Id;

        // insert the name, price and stock into the user's order list
        await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    userOrders: {
                        product: productData.name,
                        price: totalPrice,
                        quantity: quantity,
                    },
                },
            },
            { new: true }
        );

        // update the product with new stock amount
        await Product.findByIdAndUpdate(productId, {
            stock: productData.stock - quantity,
        });

        res.redirect("/shop/cart");
    } else if (quantity < 1) {
        // Do not allow the purchase of 0 or negative products
        const err = "Please do not order zero or negative quantities.";

        const { name, description, price, stock } = productData;
        res.render("displaySingleProduct", {
            title: "Shop Product",
            err,
            name,
            description,
            price: price.toFixed(2),
            stock,
            id: productId,
        });
    } else if (productData.stock < quantity) {
        // If the quantity is higher than the stock, show an error, don't leave the page
        const err = "Please do not order a quantity higher than the stock.";
        const { name, description, price, stock } = productData;

        res.render("displaySingleProduct", {
            title: "Shop Product",
            err,
            name,
            description,
            price: price.toFixed(2),
            stock,
            id: productId,
        });
    }
};

module.exports.displayUserCart = async (req, res, next) => {
    // Get all information about the user
    const id = req.session.Id;
    const userData = await User.findById(id);

    const orderList = userData.userOrders.map((order) => {
        return {
            prodName: order.product,
            totalPrice: order.price,
            totalQuantity: order.quantity,
        };
    });

    res.render("userCart", { title: "User Cart Orders", orderList });
};
