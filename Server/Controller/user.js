const User = require("../models/Auth");
const bcrypt = require("bcrypt");

exports.updateUser = async (req, res) => {
  const id = req.params._id;

  try {
    const { username, password, email } = req.body;
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const user = await User.findByIdAndUpdate(
      id,
      {
        username,
        password: hashedPassword,
        email,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", updatedUser: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params._id;
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      res.status(404).send("user not found");
    }
    res.status(200).json({
      message: "deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.followUser = async (req, res) => {
  console.log(req.body.userId);
  const id = req.params._id;
  if (req.body.userId !== id) {
    try {
      const user = await User.findById(req.body.userId);
      const currentUser = await User.findById(id);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: id } });
        await currentUser.updateOne({ $push: { following: req.body.userId } });
        res.status(200).json("Account has been followed");
      } else {
        res.status(403).json("You already followed this Account");
      }
    } catch (error) {
      res.status(404).json(error);
    }
  } else {
    res.status(403).json("You Can't Follow Yourself");
  }
};

exports.UnfollowUser = async (req, res) => {
  console.log(req.body.userId);
  const id = req.params._id;
  if (req.body.userId !== id) {
    try {
      const user = await User.findById(req.body.userId);
      const currentUser = await User.findById(id);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: id } });
        await currentUser.updateOne({ $pull: { following: req.body.userId } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("You dont follow this user");
      }
    } catch (error) {
      res.status(404).json(error);
    }
  } else {
    res.status(403).json("You Can't UnFollow Yourself");
  }
};
