require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const bodyParser = require('body-parser')
const app = express()

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection
db.on('error', err => {
    console.log(err)
})

db.on('open', () => {
    console.log('Connected to MongoDB')
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(`${__dirname}/client/build`))

app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})
// const creatureRoutes = require('./controllers/creatureController')
// app.use('/api/creatures', creatureRoutes)

app.get('/', (req, res) => {
    res.send(`hello world`)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log('Server is running' + PORT)
})