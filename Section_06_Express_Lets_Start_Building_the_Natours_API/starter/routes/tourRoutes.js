const express = require('express');
const { getAllTours, createTour, getTour, updateTour, deleteTour, checkID,checkBody } = require('../controllers/tourController');
const { route } = require('express/lib/application');



//__dirname => current directory of where this file is located


const router = express.Router(); //We have created router and save into this variable.

router.param('id', checkID);


//Create a checkBody middleware
//Check if body contains the name and price property
// If not, send a 400 response (bad request)
// Add it to the post handler stack

router
    .route('/')
    .get(getAllTours)
    .post(checkBody,createTour);


router
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);


module.exports = router;

