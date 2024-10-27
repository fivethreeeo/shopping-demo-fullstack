const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
require('dotenv').config()

const authController = {}

authController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      throw new Error('invalid email or password')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new Error('invalid email or password')
    }

    const token = user.generateToken()
    res.status(200).json({ status: 'success', user, token })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message })
  }
}

authController.authenticate = async (req, res, next) => {
  try {
    const tokenString = req.headers.authorization
    if (!tokenString) throw new Error('token not found')
    const token = tokenString.replace('Bearer ', '')
    jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY, (error, payload) => {
      if (error) throw new Error('invalid token')
      req.userId = payload._id
    })
    next()
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message })
  }
}

authController.checkAdminPermission = async (req, res, next) => {
  try {
    const { userId } = req
    const user = await User.findById(userId)
    if (user.level !== 'admin') throw new Error('no permission')
    next()
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message })
  }
}

module.exports = authController
