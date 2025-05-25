const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
    // name: String,
    name: {
        type: String,
        required: [true, "A tour must have a name"],
        unique: true,
        trim: true, // remove whitespace from the beginning and end of the string
    },
    duration: {
        type: Number,
        required: [true, "A tour must have a duration"],
    },
    maxGroupSize: {
        type: Number,
        required: [true, "A tour must have a group size"],
    },
    difficulty: {
        type: String,
        required: [true, "A tour must have a difficulty"],

    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
    // price: Number,
    price: {
        type: Number,
        required: [true, "A tour must have a price"],
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true, // remove whitespace from the beginning and end of the string
        required: [true, "A tour must have a summary"],
    },
    description: {
        type: String,
        trim: true, // remove whitespace from the beginning and end of the string
    },
    imageCover: {
        type: String,
        required: [true, "A tour must have a cover image"],
    },
    images: [String], // array of strings
    createdAt: {
        type: Date,
        default: Date.now(),
        // select: false, // do not return this field in the response
    },
    startDates: [Date], // array of dates
});

//we have defined a schema, now we need to create a model
//always use Uppercase for model names; it's a convention
//model is a class that we can use to create and read documents from the collection
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;