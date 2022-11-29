const http = require('http')

const server = http.createServer((req, res) => {
    // we stablish the status code of the response (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
    // and the content-type of it (https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
    // if we change to 'text/plain' the browser will show the message as '<h1>Welcome to the server</h1>'
    res.writeHead(200, { 'content-type': 'text/html' })
    //res.writeHead(200, { 'content-type': 'text/plain' })
    res.write('<h1>Welcome to the server</h1>')
    res.end()
})

server.listen(5000)
