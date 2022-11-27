/**
 * 
 *  13 - Server event emit
 *  New way to start a Server 
 * 
 */

const http = require('http')

// we instaciate the createServer function 
const server = http.createServer()

// the server emits the 'request' event
// to see more events that we can listen, access:
// https://nodejs.org/dist/latest-v18.x/docs/api/http.html -> got to Class: http.Server
server.on('request', (req, res) => {
    res.end('Welcome to home page')
})

// we stablish the number of the port to be listened
server.listen(5000)
