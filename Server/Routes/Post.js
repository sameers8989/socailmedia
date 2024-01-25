const express = require("express");
const routes = express.Router();
const postController = require("../Controller/post");

routes.post("/post", postController.uploadPost);
routes.put("/update/:id", postController.updatePost);
routes.delete("/delete/:id", postController.deletePost);
routes.put("/like/:id", postController.likePost);

module.exports = routes;
