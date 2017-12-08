const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const authMiddleware = require('./middleware/auth')

const server = express()

server.use(bodyParser.json()) //Allows json uploads
server.use(cors()) //Allow other origins to access us i.e. our react front-end
server.use(authMiddleware.initialize)

server.use('/', [
  require('./routes/products'),
  require('./routes/auth'),
  require('./routes/wishList')
])

 server.listen(7000, (error) => {
   console.log('Server started at http://localhost:7000')
 })