const Product = require('./Product')

Product.create([
  {
    brandName: "Coders R' Us",
    name: "Nisal Bobble Head"
  },
  {
    brandName: "Coders R' Us",
    name: "Nisal Statue"
  },
  {
    brandName: "Coders R' Us",
    name: "Nisal Plush Toy"
  },  
])
  .then((products) => {
    console.log('Created products', products)
  })
  .catch((error) => {
    console.log(error)
  })