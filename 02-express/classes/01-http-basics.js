const http = require('http')

/* const server = http.createServer()

server.on('request', (req, res) => {
    res.end('Welcome')
}) */

const server = http.createServer((req, res) => {
    // we MUST always send an "end" message to which server requirement
    res.end('Welcome to the server')
})

server.listen(5000)
