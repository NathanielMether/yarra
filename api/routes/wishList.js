const express = require('express')
const WishList = require('../models/WishList')
const { requireJWT } = require('../middleware/auth')

const router = express.Router()

router.get('/wishlist', requireJWT, (req, res) => {
  WishList.findOne({ user: req.user })
    .populate('products')
    .then((wishlist) => {
      if (wishlist) {
        res.json({ products: wishlist.products })
      }
      else {
        // No wishlist created for this user yet
        res.json({ products: []})
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message })
    })
})

// Add product to wishlist
router.post('/wishlist/products/:productID', requireJWT, (req, res) => {
  const { productID } = req.params
  WishList.findOneAndUpdate(
    { user: req.user}, 
    { $addToSet: { products: productID } }, 
    { upsert: true, new: true, runValidators: true}
  )
    .populate('products')
    .then((wishlist) => {
      res.json({ products: wishlist.products })
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

// Remove product from wishlist
router.delete('/wishlist/products/:productID', requireJWT, (req, res) => {
  const { productID } = req.params
  WishList.findOneAndUpdate(
    { user: req.user}, 
    { $pull: { products: productID } }, 
    { upsert: true, new: true, runValidators: true}
  )
    .populate('products')
    .then((wishlist) => {
      res.json({ products: wishlist.products })
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
})

module.exports = router