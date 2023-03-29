const express = require("express");
const route = express.Router();
const { getOneUser, rateUser } = require("../controllers/profilController");
const AuthJwt = require("../middleware/authJwtMiddleware");

route.get("/", getOneUser);
route.patch("/rate", AuthJwt, rateUser);
module.exports = route;
