const User = require('../models/user.model');
const generateToken = require('../utils/jwt');
const { encryptPassword, verifyPassword } = require('../utils/pw-encryption');

const createUser = async (req, res) => {
  try {
    const { name, gender, email, password } = req.body;
    const hashedPassword = await encryptPassword(password);

    const createUser = new User({
      name,
      gender,
      email,
      password: hashedPassword,
    });
    const { _id, created_at } = await createUser.save();

    return res.status(201).json({
      message: 'User account successfully created',
      payload: { _id, name, created_at },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const passwordValidation = await verifyPassword(password, user.password);
    if (!passwordValidation) {
      throw new Error('Invalid Password');
    }

    const token = generateToken(user);

    return res.status(201).json({
      token: token,
      user: user._id,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      throw new Error('No User Account');
    }
    return res.status(201).json({
      message: 'User accounts successfully loaded',
      payload: users,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const getDetailUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new Error('No User Account');
    }
    const { _id, name, gender, email, created_at, updated_at } = user;
    return res.status(201).json({
      message: 'User accounts successfully loaded',
      payload: { _id, name, gender, email, created_at, updated_at },
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, gender } = req.body;

  try {
    await User.findOneAndUpdate({ _id: id }, { name, gender }, { new: true });

    return res.status(201).json({
      message: 'User accounts successfully updated',
      payload: { userId: id },
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  getAllUser,
  getDetailUser,
  updateUser,
};
