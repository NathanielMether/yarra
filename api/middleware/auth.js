const User = require('../models/User')
const passport = require('passport')
const JWT = require('jsonwebtoken')
const PassportJwt = require('passport-jwt')

const jwtSecret = 'kj3VUesqPgq07TUx+99FDhApUSURrKfh9QnTnK/WCALnQHazIAgE9Qiyj3OtKXhW'
const jwtAlgorithm = 'HS256'
const jwtExpiry = '7 days'

passport.use(User.createStrategy())

function register(req, res, next) {
  // Create a fresh user model
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })
  // Create the user with the specified password
  User.register(user, req.body.password, (error, user) => {
    if (error) {
      // Our register middleware failed
      next(error)
      return
    }

    // Store user so we can access it in our handler
    req.user = user
    // Success
    next()
  })
}

passport.use(new PassportJwt.Strategy({
    jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
    algorithms: [jwtAlgorithm]
  },
  // When we have verified token
  (payload, done) => {
    // Find the real user from database using the id in the JWT
    User.findById(payload.sub)
      .then((user) => {
        if (user) {
          done(null, user)
        }
        else {
          done(null, false)
        }
      })
      .catch((error) => {
        done(error, false)
      })
  }
))

function signJWTForUser(req, res) {
  const user = req.user
  const token = JWT.sign(
    {
    email: user.email
    },
    jwtSecret,
    {
      algorithm: jwtAlgorithm,
      expiresIn: jwtExpiry,
      subject: user._id.toString()
    }
  )

  res.json({ token })
}

module.exports = { 
  initialize: passport.initialize(),
  register,
  signIn: passport.authenticate('local', { session: false }),
  requireJWT: passport.authenticate('jwt', { session: false }),
  signJWTForUser
}