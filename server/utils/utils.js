const jwt = require("jsonwebtoken");


const validateEmail = (email) => {
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailFormat)) return true;
    else return false;
  };

const generateToken = ({ email=null  }) => {
    const primaryToken = jwt.sign(
      { email: email  },
      process.env.PRIMARY_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign(
      { email: email},
      process.env.REFRESH_SECRET_KEY,
      {
        expiresIn: "7days",
      }
    );
    return {
      primaryToken,
      refreshToken,
    };
  };


  module.exports = { validateEmail,  generateToken };