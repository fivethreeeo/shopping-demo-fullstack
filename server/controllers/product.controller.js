const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Product = require('../models/Product')
require('dotenv').config()

const PAGE_SIZE = 5

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

productController.getProducts = async (req, res) => {
  try {
    const { page, name } = req.query
    const condition = name ? { name: { $regex: name, $options: 'i' } } : {}
    let query = Product.find(condition)
    let response = { status: 'success' }
    if (page) {
      const prevPage = page - 1
      query.skip(prevPage * PAGE_SIZE).limit(PAGE_SIZE)
      const totalItemCount = await Product.find(condition).countDocuments()
      const totalPageNum = Math.ceil(totalItemCount / PAGE_SIZE)
      response.totalPageNum = totalPageNum
    }
    const products = await query.exec()
    response.products = products
    res.status(200).json(response)
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message })
  }
}

module.exports = productController
