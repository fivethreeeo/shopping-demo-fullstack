const mongoose = require('mongoose')
const User = require('./User')
const Product = require('./Product')
const Schema = mongoose.Schema

const orderSchema = new Schema(
  {
    userId: { type: mongoose.ObjectId, ref: User },
    shipTo: { type: String, required: true },
    contact: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'preparing' },
    items: [
      {
        productId: { type: mongoose.ObjectId, ref: Product },
        size: { type: String, required: true },
        qty: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
)

orderSchema.methods.toJSON = function () {
  const obj = this._doc

  delete obj.__v
  delete obj.updateAt
  delete obj.createAt

  return obj
}

const Order = mongoose.model('User', orderSchema)
module.exports = Order
