const User = require('../models/User')
const bcrypt = require('bcryptjs')
const saltRounds = 10

const userController = {}

userController.createUser = async (req, res) => {
  try {
    const { name, email, password, level } = req.body

    const user = await User.findOne({ email })

    if (user) {
      throw new Error('Email already exist')
    }

    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)

    const newUser = new User({
      name,
      email,
      password: hash,
      level: level ? level : 'customer',
    })

    await newUser.save()

    res.status(200).json({ status: 'success' })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message })
  }
}

userController.getUser = async (req, res) => {
  try {
    const { userId } = req
    const user = await User.findById(userId)
    if (!user) {
      throw new Error('invalid token')
    }
    res.status(200).json({ status: 'success', user })
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message })
  }
}

module.exports = userController
