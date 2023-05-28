const express = require('express')
const server = express()
const router = require('./router')
server.use(express.json())
server.use('/api', router)
server.listen(3000, () => console.log("Rodando na porta 3000..."))

