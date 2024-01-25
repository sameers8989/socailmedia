const express = require("express");
const routes = express.Router();
const userController = require("../Controller/user");

routes.put("/update/:_id", userController.updateUser);
routes.delete("/delete/:_id", userController.deleteUser);
routes.put("/:_id/follow", userController.followUser);
routes.put("/:_id/unfollow", userController.UnfollowUser);

module.exports = routes;
