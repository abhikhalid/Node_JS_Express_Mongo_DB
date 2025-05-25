const fs = require('fs');
const Tour = require('../models/tourModel');

// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

//middleware
//no longer needed as we are using mongoose to handle the database operations. mongodb gives us error for invalid id.
// exports.checkID = (req, res, next, val) => {
//     console.log(`Tour id is: ${val}`); // this will log the id that was passed in the URL

//     if (req.params.id * 1 > tours.length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         });
//     }

//     next(); // call the next middleware function in the stack
// }

///middleware
exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        });
    }
    next(); // call the next middleware function in the stack
}

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime, // we added this property in the middleware above
        // results: tours.length,
        // data: {
        //     tours: tours,
        // }
    });
};

exports.getTour = (req, res) => {
    console.log(req.params); // req.params is an object that contains the route parameters. In this case, it will contain the id parameter.

    // const id = req.params.id * 1; // convert the string to a number

    // if (id > tours.length) {
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: 'Invalid ID'
    //     });
    // }


    // const tour = tours.find(tour => tour.id === +req.params.id); // find the tour with the given id

    // res.status(200).json({
    //     status: 'success',
    //     data: {
    //         tour: tour // +req.params.id converts the string to a number
    //     }
    // });
};

exports.updateTour = (req, res) => {

};

exports.createTour = (req, res) => {

};

exports.deleteTour = (req, res) => {

};