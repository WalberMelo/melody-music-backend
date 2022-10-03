const jwt = require("jsonwebtoken");

function createToken(user, expiresIn) {
  //Get id and email from user object
  const { id, email } = user;

  //Payload. The second part of the token is the payload
  const payload = { id, email };

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
