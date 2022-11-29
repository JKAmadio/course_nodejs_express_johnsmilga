const express = require('express')
const { products } = require('./data.js')
const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Welcome</h1><a href="/api/products">products</a>')
})

// getting some infos of all the product list described at file ./data.js
app.get('/api/products', (req, res) => {
    // filtering the infos that we want by destructuring the item
    const newProducts = products.map(product => {
        const { id, name, image } = product
        return { id, name, image }
    })
    // define that the response must be read in a json format
    res.json(newProducts)
})

// passing router parameters to specify an specific product
// everything from the ":" will be read as an placerholder 
app.get('/api/products/:productID', (req, res) => {
    console.log(req.params);
    const { productID } = req.params

    // artenttion: the router parameter is a String!
    const singleProduct = products.find(product => product.id === Number(productID))

    // we can define different approachs for which type of parameter passed
    if (!singleProduct) {
        return res.status(404).send('Product does not exist')
    }
    return res.json(singleProduct)
})

app.listen(5000, () =>  {
    console.log('server is listening on port 5000...');
})
