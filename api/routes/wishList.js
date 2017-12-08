const express = require('express')
const WishList = require('../models/WishList')
const { requireJWT } = require('../middleware/auth')

const router = express.Router()

router.get('/wishlist', requireJWT, (req, res) => {
  WishList.findOne({ user: req.user })
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

module.exports = router