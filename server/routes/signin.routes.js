const { Router } = require("express");
const authController = Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { UserModel} = require("../models/User.model");

const {
  generateToken,
  validateEmail,
} = require("../utils/utils");

//<-------------------------------   APT for sign in   ------------------------------->

authController.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const validEmail = validateEmail(email);
  if (validEmail) {
    const user = await UserModel.findOne({email: email });
    if (user) {
      const hash = user.password;
      if (user && hash) {
        const verification = await bcrypt.compare(password, hash);
        if (verification) {
          const token = generateToken({
            userId:user._id,
            email: user.email,
            fullName: user.fullName,
            role: user.userRole,
          });
          res.status(200).send({
            msg: "Signed in successfully",
            email: user.email,
            fullName: user.fullName,
            role: user.userRole,
            token,
          });
        } else if (user && !verification)
          res.status(401).send({ msg: "Please enter a valid password." });
      }
    } else
      res.status(404).send({
        msg: "The account you mentioned does not exist. Please try with correct email address.",
      });
  } else res.status(401).send({ msg: "Please enter a valid email address." });
});

module.exports = authController;
