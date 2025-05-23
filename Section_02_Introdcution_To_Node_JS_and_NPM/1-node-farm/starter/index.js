const fs = require('fs');
const http = require('http');
const url = require('url');

//top level code
//gets executed once when the file is loaded

const replaceTemplate = (temp, product) => {
    //there might be multiple occurences of the same placeholder
    //so we use regex to replace all occurences
    //the g flag means global
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if(!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic'); //not-organic is a class name
    }

    return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

//SERVER
const server = http.createServer((req, res) => {
    // console.log(req.url);
    // res.end('Hello from the server!');
    const pathName = req.url;
    
    //Overview Page
    if (pathName === '/' || pathName === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
    
        res.end(output);
    }
    //Product Page
    else if (pathName === '/product') {
        res.end('This is the PRODUCT');
    }
    //API
    else if (pathName === '/api') {
        res.writeHead(200,{'Content-type': 'application/json'});
        res.end(data);
    }
    //Not Found
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