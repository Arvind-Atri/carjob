const bcrypt = require("bcrypt");

const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

require("dotenv").config();
//signup route handler

exports.signup = async (req, res) => {
  console.log("ENTERED SIGnup");
  console.log(req.body);
  try {
    // get all the data from
    const { firstname,lastname, email, password } = req.body;
    // check if already exists
    console.log(firstname,"+",lastname,"+",email,"+",password)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already Exists",
      });
    }
    console.log("DONT EXIST")
    // secure the password

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "error in hashing password",
        // how to implement retry strategy for hash
      });
    }
    console.log("Hashing")

    // create entry

    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      
    });
    console.log("ENTRY")
    return res.status(200).json({
      success: true,
      message: "user created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "user cannot be registered ,pls try again later",
    });
  }
};

exports.login = async (req, res) => {
  console.log("Entered LOGIN")
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    if (!email || !password) {
      return res.status(400).json({
        success: true,
        message: "please fill all the details properly",
      });
    }
    console.log("VAlidation done")
    // check for registered user




    let data=await User.find({});
    console.log(data);



    let user = await User.findOne({email:email});
    console.log("USER",user);
    if (!user) {
      return res.status(401).json({
        success: true,
        message: "User is not registered",
      });
    }
    console.log("user exist->login")
    // verify password and generate a jwt token

    const payload = {
      email: user.email,
      id: user._id,
      
    };
    console.log("APuload")
    if (await bcrypt.compare(password, user.password)) {
      // pswd match
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user = user.toObject();
      user.token = token;
      user.password = undefined;
      const options = {
        expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      console.log("Token created")
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "user logged in successfully",
      });
      console.log("Logged in")
    } else {
      return res.status(403).json({
        success: false,
        message: "password Incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "login failure",
    });
  }
};
