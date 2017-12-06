const mongoose = require('./init')

const Product = mongoose.model('Product', { 
  brandName: {
    type: String,
    required: [true, 'Brand Name required']
  },
  name: {
    type: String,
    required: [true, 'Name required']
  }
})

module.exports = Product