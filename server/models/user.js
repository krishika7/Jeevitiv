const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	address: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	confirmPassword: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, 'fher2365r87q2347t', {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		name: Joi.string().required().label("Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		confirmPassword: passwordComplexity().required().label("Confirm Password"),
		address: Joi.string().required().label("Address"),

	});
	return schema.validate(data);
};

module.exports = { User, validate };
