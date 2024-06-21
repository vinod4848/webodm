const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      username,
      email,
      password,
      role,
    });

    await user.save();

    res.json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     let user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     const payload = {
//       user: {
//         id: user.id,
//         username: user.username,
//         role: user.role,
//       },
//     };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" },
//       async (err, token) => {
//         if (err) throw err;

//         user.token = token;
//         user.expiresIn = new Date(Date.now() + 3600000);
//         await user.save();

//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // verify email and passowrd
    const user = await User.findOne({ email });
    if (!user) res.send("No user found with this Email");

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) res.send("Wrong Credentials");

    // save to cookie
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    //update signin
    user.token = token;
    await user.save();
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};
