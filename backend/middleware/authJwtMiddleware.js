require("dotenv").config();

const Auth = require("../models/authModel");
const jwt = require("jsonwebtoken");

const authJwt = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      throw Error("Must be authenticated");
    }
    const token = authorization.split(" ")[1];
    const { _id } = await jwt.verify(token, process.env.SECRET);
    const userId = await Auth.findById({ _id }).select({ _id });

    req.user = userId._id;

    next();
  } catch (e) {
    res.json({ error: e.message });
  }
};

module.exports = authJwt;
