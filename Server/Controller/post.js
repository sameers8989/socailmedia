const Post = require("../models/Posts");

exports.uploadPost = async (req, res) => {
  try {
    const newPost = await Post(req.body);
    await newPost.save();
    res.status(200).json("posted");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).send("you can update your post");
    }
  } catch (error) {
    res.status(500).json("Something Fishing", error);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne({ $set: req.body });
      res.status(200).json("poset Deleted");
    } else {
      res.status(403).json({ message: "you can delete your post" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json({ message: "The post has been liked" });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json({ message: "The post has been disliked" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
