 const express = require('express')
 const bodyParser = require('body-parser')

 const server = express()

 server.use(bodyParser.json()) //Allows json uploads

server.use('/', [
  require('./routes/products'),
  require('./routes/auth')
])

 server.listen(7000, (error) => {
   console.log('Server started at http://localhost:7000')
 })