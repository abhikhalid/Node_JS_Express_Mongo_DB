const express = require('express');
const { getAllUsers, createUser, getUser, updateUser, deleteUser } = require('../controllers/userController');



const router = express.Router(); //We have created router and save into this variable.

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;