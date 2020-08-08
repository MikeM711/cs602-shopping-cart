const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const credentials = require("../credentials.js");

const dbUrl = 'mongodb://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database;

let connection = null;
let model = null;

const userSchema = new Schema(
	{
		username: String,
		password: String,
		status: String,
	},
	{ collection: "users" }
);

module.exports.getModel = () => {
	if (connection == null) {
		console.log("Creating connection and model...");
		connection = mongoose.createConnection(dbUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		model = connection.model("UserModel", userSchema);
	}
	return model;
};

