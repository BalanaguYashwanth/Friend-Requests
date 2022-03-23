import { User } from "../models/usermodel.js";
import asyncHandler from "express-async-handler";
import generateWebToken from "../utils/generateToken.js";

const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.comparePassword(password))) {
    res.json({
      id: user._id,
      token: generateWebToken(user._id),
    });
  } else {
    res.sendStatus(401);
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const existuser = await User.findOne({ email });

  if (existuser) {
    res.json({ user: "user is exists" });
  } else {
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      console.log("not valid user");
      res.sendStatus(401);
    }
  }
};

export { authUser, registerUser };
