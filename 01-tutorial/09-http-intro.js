/**
 * 
 * 09 - HTTP intro
 * 
 * Creating our first web server
 * 
 * 
 */

const http = require('http');

// we create a server with the http method createServer
// this method is a callback function with two arguments
// req for incoming request  
// res fior what we are sending back
const server = http.createServer((req, res) => {
    // response method to write on the screen
    res.write(`<h1>Welcome to our server</h1>`);
    // response method to end the response request
    //res.end();

    if (req.url === '/')
        res.write('This is the Home page')
    else if (req.url === '/about')
        res.write('This is the About page')
    else
        res.write('Oooops')
    res.end();
});

// we stablish the port which will be listened
server.listen(5000);

// open the browser at localhost:5000
