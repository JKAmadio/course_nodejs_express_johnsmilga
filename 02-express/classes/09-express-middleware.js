const express = require('express')
const app = express()

//req => middleware => res

// let's say that for every request to existing routes
// we want to know the method used, the route accessed and the current year
// we could repeat for every request the instructions to that
// OR we could set a function to do that

// middlewares are any functionallity that occures between que request and the response
const getInfos = (req, res, next) => {
    const method = req.method
    const url = req.url
    const currentYear = new Date().getFullYear()
    console.log(method, url, currentYear);
    // ALWAYS when we use middleware we MUST do one of two things:
    // 1. terminates it if a response (that will be the same to every request that uses this middleware)
    // 2. terminates it evolking the "next()" function
    next()
}

const getQuery = (req, res, next) => {
    const query = req.query
    console.log(query);
    next()
}

const getApiQuery = (req, res, next) => {
    const query = req.query
    console.log(query);
    next()
}

// we stablish the middleware to me called after the route
// express passes automaticly que req and res infos to the middleware
app.get('/', getInfos, (req, res) => {
    res.send('Home')
})

app.get('/about', getInfos, (req, res) => {
    res.send('About')
})

// we can use the app.use() function to indicate a middleware
// that must be executed for all coming requests
app.use(getQuery)

// we can specify a path that will be used as base to apply the middleware
app.use('/api', getApiQuery)

app.get('/products/:productID', (req, res) => {
    res.send('Product ID')
})

app.get('/items/:itemName', (req, res) => {
    res.send('Item Name')
})

app.get('/api/products/:productID', (req, res) => {
    res.send('Product ID from API')
})

app.get('/api/items/:itemName', (req, res) => {
    res.send('Item Name from API')
})

app.listen(5000, () => {
    console.log('server is listening on port 5000...');
})
