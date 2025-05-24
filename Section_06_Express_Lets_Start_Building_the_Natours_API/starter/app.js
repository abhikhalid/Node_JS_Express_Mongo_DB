const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes'); // Importing the tour routes
const userRouter = require('./routes/userRoutes'); // Importing the user routes

const app = express();

// 1) MIDDLEWARES

app.use(morgan('dev')); // Morgan is a HTTP request logger middleware for Node.js. It simplifies the process of logging requests to your application, making it easier to debug and monitor your app's performance.

//express.json() is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.

//Middleware is basically just a function that can modify the incoming request data.
app.use(express.json()); // Middleware to parse JSON data

app.use((req, res, next) => {
    console.log('Hello from the middleware 👋')
    next(); // call next() to pass control to the next middleware function in the stack
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString(); // add a new property to the request object
    next();
});


// 2) Route Handlers
//3) Routes

app.use('/api/v1/tours', tourRouter); //connecting 'tourRouter' to the main application.
app.use('/api/v1/users', userRouter); //connecting 'userRouter' to the main application.    

module.exports = app; // Exporting the app so that it can be used in other files, such as server.js