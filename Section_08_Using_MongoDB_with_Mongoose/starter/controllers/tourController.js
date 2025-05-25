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

//Now our mongoose model will handle the validation of the id, so we don't need this middleware anymore.
///middleware

// exports.checkBody = (req, res, next) => {
//     if (!req.body.name || !req.body.price) {
//         return res.status(400).json({
//             status: 'fail',
//             message: 'Missing name or price'
//         });
//     }
//     next(); // call the next middleware function in the stack
// }

exports.getAllTours = async (req, res) => {
    try {
        console.log(req.query); // log the query object to see what fields are being queried')


        //1A) Filtering
        const queryObj = { ...req.query }; // create a copy of the query object
        const excludedFields = ['page', 'sort', 'limit', 'fields']; // fields to exclude from the query
        excludedFields.forEach(el => delete queryObj[el]); // remove the excluded fields from the query object

        // console.log(req.query, queryObj); // log the query object to see what fields are being queried

        //1B) Advanced Filtering
        let queryStr = JSON.stringify(queryObj); // convert the query object to a string
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`); // replace all instances of gte, gt, lte, lt with $gte, $gt, $lte, $lt

        // console.log(JSON.parse(queryStr)); // log the query string to see what fields are being queried

        let query = Tour.find(JSON.parse(queryStr)); // find all tours using the Tour model

        //2) Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' '); // split the sort query by comma and join with space
            // console.log(sortBy); // log the sort query to see what fields are being sorted
            query = query.sort(sortBy); // sort the query by the fields specified in the sort query
            //sort('price ratingAverage') // sort by price and ratingAverage
        } else {
            //if user does not specify sort query, sort by createdAt in descending order
            query = query.sort('-createdAt'); // default sort by createdAt in descending order
        }

        //EXECUTE QUERY
        const tours = await query; // execute the query and get the tours

        res.status(200).json({
            status: 'success',
            results: tours.length, // return the number of tours found
            data: {
                tours: tours // return the tours found
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err // return the error message
        });
    }
};

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id); // find a tour by id using the Tour model

        res.status(200).json({
            status: 'success',
            data: {
                tour: tour // return the tour found
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err // return the error message
        });
    }
};

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // return the updated document
            runValidators: true // run the validators defined in the model
        });

        res.status(200).json({
            status: 'success',
            data: {
                tour: tour // return the updated tour
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message // return the error message
        });
    }
};

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body); // create a new tour using the Tour model
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour // return the newly created tour
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err // return the error message
        });
    }
};

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id); // delete a tour by id using the Tour model
        res.status(204).json({
            status: 'success',
            data: null // no content to return (In a restful API, a 204 status code indicates that the request was successful but there is no content to return)
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err // return the error message
        });
    }
};