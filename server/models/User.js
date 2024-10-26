const mongoose = require('mongoose')
require('dotenv').config()
const { sign } = require('jsonwebtoken')

const Schema = mongoose.Schema
const userSchema = new Schema(
  {
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    level: {
      type: String,
      default: 'customer',
      enum: ['customer', 'admin'],
      required: true,
    },
  },
  { timestamps: true }
)

userSchema.methods.toJSON = function () {
  const obj = this._doc

  delete obj.password
  delete obj.__v
  delete obj.updateAt
  delete obj.createAt

  return obj
}

userSchema.methods.generateToken = function () {
  const token = sign({ _id: this.id }, process.env.JWT_ACCESS_SECRET_KEY, {
    expiresIn: '1d',
  })

  return token
}

const User = mongoose.model('User', userSchema)
module.exports = User
