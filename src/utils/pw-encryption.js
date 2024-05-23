const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();
const saltRounds = parseInt(process.env.PW_SALTROUND);

const encryptPassword = async (password) =>
  await bcrypt.hash(password, saltRounds);

const verifyPassword = async (password, hashedPassword) =>
  await bcrypt.compare(password, hashedPassword);

module.exports = { encryptPassword, verifyPassword };
