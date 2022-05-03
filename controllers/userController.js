const User = require("../models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).send("All inputs are required");
  }

  try {
    const user = await User.findOne({ email });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (user && isPasswordValid) {
      const token = jwt.sign(
        { id: user._id },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h"
        }
      );

      return res.status(200).json(token);
    } else{
      return res.status(400).send("Email or password do not match");
    }
    
  } catch(err) {
    return res.status(500).json(err);
  }
}

const register = async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).send("All inputs are required");
  }
  
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({email, password: hashedPassword});

    const token = jwt.sign(
      { id: user._id },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h"
      }
    );

    return res.status(200).json(token)
  } catch(err) {
    return res.status(500).json(err);
  }
}

module.exports = {login, register}