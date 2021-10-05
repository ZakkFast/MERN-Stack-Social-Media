const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Send bad request if error with json storin errors
    }
    res.send("User Route");
  }
);

module.exports = router;
