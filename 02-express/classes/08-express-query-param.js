const express = require('express')
const { products } = require('./data.js')
const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Welcome</h1><a href="/api/products">products</a>')
})

// passing query parameters to get some info from request
// we keep the router simple but when we access it, everything from "?" will be read as an key/value pair 
app.get('/api/v1/products', (req, res) => {
    // if we access localhost:5000/api/v1/products?name=cheese
    // we will console.log -> { name : 'cheese' }
    //console.log(req.query);

    // if we access http://localhost:5000/api/v1/products?search=e&limit=2
    // we will recive the first 2 products that start with the letter "e"
    const { search, limit } = req.query
    let sortedProduct = [...products]
    if (search) {
        sortedProduct = sortedProduct.filter(product => {
            return product.name.startsWith(search)
        })
    }
    if (limit) {
        sortedProduct = sortedProduct.slice(0, Number(limit))
    }
    if (sortedProduct.length < 1)
        return res.status(200).send('No products match your search')
    return res.status(200).json(sortedProduct)
})

app.listen(5000, () =>  {
    console.log('server is listening on port 5000...');
})
