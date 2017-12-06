const express = require('express')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

// Register
router.post('/auth/register', authMiddleware.register, (req, res) => {
  res.json({
    user: req.user
  })
})

module.exports = router