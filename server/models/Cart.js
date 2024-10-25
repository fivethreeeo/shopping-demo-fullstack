const mongoose = require('mongoose')
const User = require('./User')
const Product = require('./Product')
const Schema = mongoose.Schema

const cartSchema = new Schema(
  {
    userId: { type: mongoose.ObjectId, ref: User },
    items: [
      {
        productId: { type: mongoose.ObjectId, ref: Product },
        size: { type: String, required: true },
        qty: { type: Number, required: true, default: 1 },
      },
    ],
  },
  { timestamps: true }
)

cartSchema.methods.toJSON = function () {
  const obj = this._doc

  delete obj.__v
  delete obj.updateAt
  delete obj.createAt

  return obj
}

const Cart = mongoose.model('User', cartSchema)
module.exports = Cart
