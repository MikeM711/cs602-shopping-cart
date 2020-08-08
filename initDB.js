const ProductDB = require("./models/productDB");
const Product = ProductDB.getModel();

const UserDB = require("./models/userDB");
const User = UserDB.getModel();

(async () => {
	// Initialize Products
	await Product.deleteMany({});

	let product1 = new Product({
		name: "Trampoline",
		description:
			"Product #1 Just adding the simplest native php_mysql way to fetch a single value for completeness",
		price: 10,
		stock: 100,
	});

	let product2 = new Product({
		name: "Scissors",
		description: "Product #2",
		price: 20,
		stock: 200,
	});

	let product3 = new Product({
		name: "Paper",
		description: "Product #3",
		price: 30,
		stock: 300,
	});

	let product4 = new Product({
		name: "Violin",
		description: "Produce #4: Violin instrument",
		price: 15,
		stock: 400,
	});

	let product5 = new Product({
		name: "Computer",
		description: "Product #5: Personal computer",
		price: 20,
		stock: 400,
	});

	// await Promise.all([
	//         product1.save(),
	// 		product2.save(),
	// 		product3.save(),
	// 		product4.save(),
	// 		product5.save(),
	// 	]);

	// add products one at a time to show we can sort on "newest"
	await product1.save();
	await product2.save();
	await product3.save();
	await product4.save();
	await product5.save();

	let currentProducts = await Product.find({});

	console.log(currentProducts);

	// Initialize Users
	await User.deleteMany({});

	let user1 = new User({
		username: "Bob",
		password: "Bobpw",
		status: "admin",
	});

	let user2 = new User({
		username: "John",
		password: "Johnpw",
		status: "user",
	});

	let user3 = new User({
		username: "Bill",
		password: "Billpw",
		status: "user",
	});

	await Promise.all([user1.save(), user2.save(), user3.save()]);

	let currentUsers = await User.find({});

	console.log(currentUsers);

	process.exit();
})();
