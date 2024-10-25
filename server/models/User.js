const mongoose = require('mongoose')
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

const User = mongoose.model('User', userSchema)
module.exports = User
