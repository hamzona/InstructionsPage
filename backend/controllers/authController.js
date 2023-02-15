require("dotenv").config();

const User = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function createToken(_id) {
  return jwt.sign({ _id }, process.env.SECRET);
}
const singup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const exsist = await User.findOne({ email });
    console.log(exsist);
    if (exsist !== null) {
      throw Error("user already in use");
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email: email,
      password: hash,
    });
    const token = await createToken(newUser._id);

    res.json({ email, token });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const LoginUser = await User.findOne({ email });

    if (LoginUser === null) {
      throw Error("User doesnt exsist");
    }
    if (!(await bcrypt.compare(password, LoginUser.password))) {
      throw Error("Password incorrect");
    }

    const token = await createToken(LoginUser._id);

    res.json({ email, token });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = { singup, login };
