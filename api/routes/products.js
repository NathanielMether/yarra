const express = require('express')
const Product = require('../models/Product')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

router.get('/products', authMiddleware.requireJWT, (req, res) => {
  Product.find()
    .then((products) => {
      res.json(products)
    })
    .catch((error) => {
      res.json({ error: error.message })
    })
})

router.post('/products', (req, res) => {
  const attributes = req.body
  Product.create(attributes)
    .then((product) => {
      res.status(201).json(product)
    })
    .catch((error) => {
      res.status(400).json({ error: error })
    })
})

router.patch('/products/:id', (req, res) => {
  const id = req.params.id
  const attributes = req.body
  Product.findByIdAndUpdate({_id: id}, {$set: {name: attributes.name}}, {new: true, runValidators: true})
    .then((updatedProduct) => {
      res.status(201).json(updatedProduct)
    })
    .catch((error) => {
      res.status(400).json({ error: error })
    })
})

module.exports = router