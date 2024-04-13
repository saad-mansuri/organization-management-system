const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT || 1001
const organizationRoute = require('./routes/organization')
const connectDB = require('./config/dbConnection')
const app = express()

connectDB()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', organizationRoute)

app.listen(PORT, ()=> {[
    console.log(`Your server is running on http://localhost:${PORT}`)
]})