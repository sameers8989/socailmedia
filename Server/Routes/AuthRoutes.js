const express = require("express");
const routes = express.Router();
const AuthController = require("../Controller/AuthController");

routes.post("/register", AuthController.register);
routes.post("/login", AuthController.login);

module.exports = routes;
