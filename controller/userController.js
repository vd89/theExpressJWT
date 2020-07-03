/** @format */

import User from '../model/User';
import { genSalt, hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import config from 'config';
import { AES } from 'crypto-js';

// User route Test Controller
const test = async (req, res) => {
	res.json({ msg: 'this route is working' });
};
// User Registration controller
const register = async (req, res) => {
	try {
		const { name, email } = req.body;
		const salt = await genSalt(10);
		const password = await hash(req.body.password, salt);
		const user = new User({ name, email, password });
		const userData = await user.save();
		res.json(userData);
	} catch (error) {
		res.json({
			err: { name: error.name },
			Key: error.keyValue,
		});
	}
};

// Login user Controller
const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });
		if (!user) {
			res.json({ msg: 'The email id is not register with us ' });
		}
		const result = await compare(password, user.password);
		if (!result) {
			res.json({ msg: 'The password is not match ' });
		}
		const payload = {
			user: user._id,
		};
		const secretKey = config.get('JWTSecretKey');
		const token = await sign(payload, secretKey, { expiresIn: 3000 });
		const cryptoKey = config.get('CryptuSecretKey');
		const newToken = AES.encrypt(token, cryptoKey).toString();
		console.log(token);
		console.log(newToken);
		res.json({ token: newToken });
	} catch (error) {
		res.json({ err: 'there is some error' });
	}
};

const dashboard = async (req, res) => {
	const user = await User.findById(req.user.user);
	res.send(user);
};
export default { test, register, login, dashboard };
