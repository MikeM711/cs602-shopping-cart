const ProductDB = require("./models/productDB");
const Product = ProductDB.getModel();

const UserDB = require("./models/userDB");
const User = UserDB.getModel();

(async () => {
	// Delete product 1
	//TODO: will need to search and delete off of users as well
	await Product.deleteOne({ name: "Trampoline" });

	process.exit();
})();
