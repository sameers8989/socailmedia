const jwt = require("jsonwebtoken");
const AuthModel = require("../models/Auth");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new AuthModel({
      username,
      password: hashedPassword,
      email,
    });

    await newUser.save();
    res.status(200).json({ message: "newUser Created", newUser });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "failed Create newUser" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Find the user by username
    const user = await AuthModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // If the password is valid, generate a token
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1hr",
    });

    const decodedPayload = jwt.decode(token);

    res.status(200).json({
      decodedPayload,
      token,
      message: "Token Generated Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Token Generation Failed" });
  }
};
