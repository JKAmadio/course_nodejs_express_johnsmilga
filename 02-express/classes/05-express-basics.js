// import the express library (must install)
const express = require('express')

// for express we MUST envolke the function to get all resources it provides
const app = express()

// when an request with GET method and directed to the url '/'
// send 'Home page' as the response
app.get('/', (req, res) => {
    res.send('Home page')
})

// for any other url not defined before independent of its method
// define an status 404 and a 'Page not found' response
app.all('*', (req, res) => {
    res.status(404).send('Page not found')
})

// set the port number to listen on server
app.listen(5000, () => {
    console.log('server is listening on port 5000');
})
