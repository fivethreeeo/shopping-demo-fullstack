const User = require('../models/User')
const bcrypt = require('bcryptjs')

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

module.exports = authController
