const express = require('express')
const app = express()

const peopleRoutes = require('./routes/people')
const authRoutes = require('./routes/auth')

app.use(express.static('./methods-public'))
app.use(express.urlencoded({ extended : false }))
app.use(express.json())

// middleware to envolke the routes that starts if '/api/people'
app.use('/api/people', peopleRoutes)

app.use('/login', authRoutes)

app.listen(5000, () => {
    console.log('server listening on port 5000...');
})
