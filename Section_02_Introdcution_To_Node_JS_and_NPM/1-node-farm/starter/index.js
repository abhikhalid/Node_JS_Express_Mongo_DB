const fs = require('fs');
const http = require('http');
const url = require('url');

//SERVER
const server = http.createServer((req, res) => {
    // console.log(req.url);
    // res.end('Hello from the server!');
    const pathName = req.url;

    if(pathName === '/' || pathName === '/overview') {
        res.end('This is the overview');
    }
    else if (pathName === '/product') {
        res.end('This is the PRODUCT');
    } else {
        // res.writeHead(404);
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'Hello World'
        });
        res.end('<h1>Page can not be found</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requsets on port 8000');
});