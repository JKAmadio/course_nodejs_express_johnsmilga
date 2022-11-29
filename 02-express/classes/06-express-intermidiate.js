const express = require('express')
const path = require('path')
const app = express()

// settings to read files that are used by the main files that we will use as base
// will be explained more later
app.use(express.static('./navbar-app'))
// app.use(express.static('./public'))

app.get('/', (req, res) => {
    // we use the sendFile method to define a file that will be used as base to the url content
    // obs: this method requires an absolute path, that's why we import the PATH library and used resolve
    res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
})

app.all('*', (req, res) => {
    res.status(404).send('Page not found')
})

app.listen(5000, () => {
    console.log('server is listening on port 5000...');
})
