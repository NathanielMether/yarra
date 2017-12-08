const mongoose = require('./init')
const Schema = mongoose.Schema

const wishListSchema = new Schema({
  // Has one user
  user: { type: Schema.ObjectId, ref: 'User', unique: true },
  // Has many products
  products: [{ type: Schema.ObjectId, ref: 'Product'}]
})

const WishList = mongoose.model('WishList', wishListSchema)

module.exports = WishList