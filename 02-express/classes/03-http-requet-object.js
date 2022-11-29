const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req.method)
    const url = req.url
    if (url === '/') {
        res.writeHead(200, { 'content-type' : 'text/html' })
        res.write('<h1>Welcome to home page</h1>')
    }
    else if (url === '/about') {
        res.writeHead(200, { 'content-type' : 'text/html' })
        res.write('<h1>Welcome to about page</h1>')
    }
    else if (url === '/about/julia') {
        res.writeHead(200, { 'content-type' : 'text/html' })
        res.write('<h1>Welcome to Julias about page</h1>')
    }
    else {
        res.writeHead(404, { 'content-type' : 'text/html' })
        res.write('<h1>Page not found</h1>')
    }
    res.end()
})

server.listen(5000)
