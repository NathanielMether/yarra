const Product = require('./Product')

Product.deleteMany()
  .then(() => {
    console.log('Deleted Products')
    process.exit()
  })