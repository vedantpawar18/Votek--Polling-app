const jwt = require("jsonwebtoken");


const validateEmail = (email) => {
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailFormat)) return true;
    else return false;
  };

const generateToken = ({ userId=null,email=null ,fullName=null,role=null  }) => {
    const primaryToken = jwt.sign(
      {userId:userId, email: email, fullName:fullName, role:role  },
      process.env.PRIMARY_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign(
      {userId:userId, email: email, fullName:fullName, role:role },
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


  // function for decrypting token
const decryptToken =(token) =>{
  const tokenDecodablePart = token.split('.')[1];
  const decoded = JSON.parse(Buffer.from(tokenDecodablePart, 'base64').toString());
  return(decoded)
}


  module.exports = { validateEmail,  generateToken, decryptToken };