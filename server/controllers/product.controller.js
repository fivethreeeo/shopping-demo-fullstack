const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Product = require('../models/Product')
require('dotenv').config()

const productController = {}

productController.createProduct = async (req, res) => {
  try {
    const { sku, name, size, image, category, description, price, stock, status } = req.body
    const product = new Product({
      sku,
      name,
      size,
      image,
      category,
      description,
      price,
      stock,
      status,
    })

    await product.save()
    res.status(200).json({ status: 'success', product })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message })
  }
}

module.exports = productController
