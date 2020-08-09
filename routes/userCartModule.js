// const productDB = require("../models/productDB.js");
// const Product = productDB.getModel();
const userDB = require("../models/userDB.js");
const User = userDB.getModel();

module.exports.addToUserCart = async (req, res, next) => {
    // res.render("displayProductsView", { title: "CS602 Shop: Display", data: data });
};

module.exports.displayUserCart = async (req, res, next) => {
    // Get all information about the user
    const id = req.session.Id;
    userData = await User.findById(id);

    const orderList = userData.userOrders.map((order) => {
        return {
            prodName: order.product,
            totalPrice: order.price,
            totalQuantity: order.quantity,
        };
    });

    console.log("order list:", orderList);

    res.render("userCart", { title: "User Cart Orders", orderList });
};
