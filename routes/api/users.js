const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route    POST api/users
// @decs     Register user
// @access   Public
router.post(
  "/",
  [
    //Validation for name, email, and password
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Send bad request if error with json storin errors
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email }); //find user by email

      if (user) {
        //if there is already a user with that name send 400
        res.status(400).json()({ errors: [{ msg: "User already exists!" }] });
      }
      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: "200", // size
        r: "pg", //  rating
        d: "mm", //   default if none found
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // Set salt
      const salt = await bcrypt.genSalt(10);
      // Encrypt password
      user.password = await bcrypt.hash(password, salt);
      // Save user to db
      await user.save();

      // Return jsonwebtoken
      res.send("User registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
