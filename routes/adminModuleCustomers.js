const userDB = require("../models/userDB.js");
const User = userDB.getModel();

const productDB = require("../models/productDB.js");
const Product = productDB.getModel();

module.exports.displayAdminCustomers = async (req, res, next) => {
    // Get all customers in the user database
    // No admins
    const customers = await User.find({ status: "user" });

    // map customers to data object
    const data = customers.map((customer) => {
        return {
            name: customer.username,
            id: customer._id,
        };
    });

    res.render("adminDisplayCustomersView", {
        title: "Admin Control Panel: Customers",
        data,
    });
};

module.exports.displayCustomerOrders = async (req, res, next) => {
    // get user ID from request params
    const id = req.params.id;

    // find the user
    const userData = await User.find({ _id: id });

    // Get user's name
    const name = userData[0].username;

    console.log(userData);

    // map user data orders to new format
    const data = userData[0].userOrders.map((order) => {
        return {
            product: order.product,
            price: order.price,
            quantity: order.quantity,
        };
    });

    res.render("adminDisplayCustomerOrders", {
        title: "Admin Control Panel: Customer Orders",
        data,
        name,
    });
};
