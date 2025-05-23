const fs = require('fs');
const http = require('http');
const url = require('url');

//top level code
//gets executed once when the file is loaded
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

//SERVER
const server = http.createServer((req, res) => {
    // console.log(req.url);
    // res.end('Hello from the server!');
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') {
        res.end('This is the overview');
    }
    else if (pathName === '/product') {
        res.end('This is the PRODUCT');
    }
    else if (pathName === '/api') {
        res.writeHead(200,{'Content-type': 'application/json'});
        res.end(data);
    }
    else {
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