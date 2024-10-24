import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

// login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    // checking if user exists
    if (!user) {
      return res.json({
        success: false,
        message: "User doesnot exist with this credentials",
      });
    }

    // password matching
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Incorrect credentials",
      });
    }
    const token = createToken(user._id);
    res.json({ success: true, message: "Successfully loggedin", token });
  } catch (err) {
    return res.json({ success: false, message: "Error in login" });
  }
};

// creation of token

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// register user

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  let image_filename = `${req.file?.filename}`;

  try {
    // checking if user exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    // validating email and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter stronger password" });
    }

    // password encryption
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // creating new user

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      image: image_filename,
    });
    const user = await newUser.save();

    // create token
    const token = await createToken(user._id);
    return res.json({
      success: true,
      message: "User registered succesfully",
      token,
    });
  } catch (err) {
    return res.json({ success: false, message: "Error in registeration" });
  }
};

export { loginUser, registerUser };
