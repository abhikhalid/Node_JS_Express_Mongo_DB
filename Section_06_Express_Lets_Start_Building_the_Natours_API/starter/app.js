const express = require('express');
const fs = require('fs');

const app = express();

//express.json() is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.

//Middleware is basically just a function that can modify the incoming request data.

app.use(express.json()); // Middleware to parse JSON data


// app.get('/', (req, res) => {
//     // res.status(200).send('Hello from the server side!');
//     res.status(200).json({
//         message: 'Hello from the server side!',
//         app: 'Natours',
//     });
// });

// app.post('/', (req, res) => {
//     res.send('You can post to this endpoint');
// });

//__dirname => current directory of where this file is located
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours,
        }
    });
});


app.post('/api/v1/tours', (req, res) => {
    // console.log(req.body); // body is the available now because we used that middleware.
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body); // create a new object with the newId and the body of the request.
    tours.push(newTour); // push the new tour to the array.
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            }
        });
    }); // why async function?  why not just use fs.writeFileSync? because we want to make sure that the server is not blocked while writing the file. We want to be able to handle other requests while this one is being processed. We are inside a callback function that is gonna run in the event loop. 

    // res.send('Done'); //we always need to send back something in order to finish request-response cycle.
});



const port = 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});