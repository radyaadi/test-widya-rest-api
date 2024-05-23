const Product = require('../models/product.model');
const User = require('../models/user.model');

const createProduct = async (req, res) => {
  try {
    const { author, name, category, quantity } = req.body;

    const createProduct = new Product({
      author,
      name,
      category,
      quantity,
    });

    const { _id, created_at } = await createProduct.save();

    return res.status(201).json({
      message: 'Product successfully created',
      payload: { _id, name, created_at },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find().populate({
      path: 'author',
      model: User,
      select: 'name -_id',
    });
    if (!products) {
      throw new Error('No Products');
    }
    return res.status(201).json({
      message: 'Products successfully loaded',
      payload: products,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const getDetailProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ _id: id }).populate({
      path: 'author',
      model: User,
      select: 'name -_id',
    });
    if (!product) {
      throw new Error('No Product');
    }

    return res.status(201).json({
      message: 'Product successfully loaded',
      payload: product,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category, quantity } = req.body;

  try {
    await Product.findOneAndUpdate(
      { _id: id },
      { name, category, quantity },
      { new: true }
    );

    return res.status(201).json({
      message: 'Product successfully updated',
      payload: { productId: id },
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.deleteOne({ _id: id });
    if (!product) {
      throw new Error('No Product');
    }

    return res.status(201).json({
      message: 'Product successfully deleted',
      payload: { productId: id },
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getDetailProduct,
  updateProduct,
  deleteProduct,
};
