const express = require('express');
const { getAllTours, createTour, getTour, updateTour, deleteTour, checkID } = require('../controllers/tourController');
const { route } = require('express/lib/application');



//__dirname => current directory of where this file is located


const router = express.Router(); //We have created router and save into this variable.

router.param('id', checkID);

router
    .route('/')
    .get(getAllTours)
    .post(createTour);


router
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);


module.exports = router;

