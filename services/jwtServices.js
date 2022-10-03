const jwt = require("jsonwebtoken");

function createToken(user, expiresIn) {
  //Get id, email, isAdmin boolean from user object
  const { id, email, isAdmin } = user;

  //Payload. The second part of the token is the payload
  const payload = { id, email, isAdmin };

  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: expiresIn,
  });
}

function decodeToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

module.exports = {
  createToken,
  decodeToken,
};
