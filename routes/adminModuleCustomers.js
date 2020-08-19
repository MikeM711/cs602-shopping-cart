const userDB = require("../models/userDB.js");
const User = userDB.getModel();

const productDB = require("../models/productDB.js");
const Product = productDB.getModel();

module.exports.displayAdminCustomers = async (req, res, next) => {
    // Get all customers in the user database, status is "user"
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
    try {
        const userData = await User.find({ _id: id });

        // Get user's name
        const name = userData[0].username;

        // map user data orders to new format
        const data = userData[0].userOrders.map((order) => {
            return {
                product: order.product,
                price: order.price,
                quantity: order.quantity,
                id: order._id,
            };
        });

        res.render("adminDisplayCustomerOrders", {
            title: "Admin Control Panel: Customer Orders",
            data,
            name,
            userId: id,
        });
    } catch (err) {
        res.redirect("/404");
    }
};

module.exports.displayUpdateCustomerOrder = async (req, res, next) => {
    // get IDs from request params
    // IDs of user and  ID of a particular user's order
    const userId = req.params.userid;
    const prodId = req.params.prodid;

    // Get user
    try {
        const userData = await User.find({ _id: userId });

        // get the order from the user's orders
        let product, price, quantity;

        // Find the order that we want to update within the user's orders
        for (order of userData[0].userOrders) {
            if (order._id == prodId) {
                product = order.product;
                price = order.price;
                quantity = order.quantity;
                break;
            }
        }

        // If product, price or quantity not found, redirect to a 404
        if (!product || !price || !quantity){
            res.redirect("/404");
        } else {
            res.render("adminUpdateCustomerOrderView", {
                title: "Update User Order",
                product,
                price,
                quantity,
                userId,
                prodId,
            });
        }
    } catch (err) {
        res.redirect("/404");
    }
};

module.exports.adminUpdateCustomerOrder = async (req, res, next) => {
    // Get values off of POST body
    const { product, price, quantity, userId, prodId } = req.body;

    // Get user
    const userData = await User.find({ _id: userId });

    // Get the orders from the user
    // If we spot the product that contains the ID in question,
    // we will modify that product
    const orders = userData[0].userOrders.map((order) => {
        // if order in the list matches the updated ID order,
        // place new values
        if (order._id == prodId) {
            return {
                _id: order._id,
                product,
                price,
                quantity,
            };
        }
        return order;
    });

    // update the customer's one order
    const result = await User.updateOne(
        { _id: userId },
        { $set: { userOrders: orders } }
    );

    res.redirect(`/admin/customer/${userId}`);
};

module.exports.displayDeleteCustomerOrder = async (req, res, next) => {
    // get IDs from request params
    // IDs of user and  ID of a particular user's order
    const userId = req.params.userid;
    const prodId = req.params.prodid;

    // Get user
    try {
        const userData = await User.find({ _id: userId });

        // get the order from the user's orders
        let product, price, quantity;

        // Find the order that we want to delete within the user's orders
        for (order of userData[0].userOrders) {
            if (order._id == prodId) {
                product = order.product;
                price = order.price;
                quantity = order.quantity;
                break;
            }
        }

        // If product, price or quantity not found, redirect to a 404
        if (!product || !price || !quantity){
            res.redirect("/404");
        } else {
            res.render("adminDeleteCustomerOrderView", {
                title: "Delete User Order",
                product,
                price,
                quantity,
                userId,
                prodId,
                name: userData[0].username,
            });
        }
    } catch (err) {
        res.redirect("/404");
    }
};

module.exports.adminDeleteCustomerOrder = async (req, res, next) => {
    // Get values off of POST body
    const { userId, prodId } = req.body;

    // Get user
    const userData = await User.find({ _id: userId });

    // Get the orders from the user
    // If we spot the product that contains the ID in question,
    // we will delete that product
    const orders = userData[0].userOrders.filter((order) => {
        // if order in the list matches the updated ID order, delete it
        if (order._id != prodId) {
            return order;
        }
    });

    // update the customer's one order
    const result = await User.updateOne(
        { _id: userId },
        { $set: { userOrders: orders } }
    );

    res.redirect(`/admin/customer/${userId}`);
};
