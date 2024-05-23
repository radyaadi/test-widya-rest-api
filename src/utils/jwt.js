const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    name: user.name,
  };

  const expiresIn = 60 * 60 * 1;

  return jwt.sign(payload, secretKey, { expiresIn: expiresIn });
};

module.exports = generateToken;
