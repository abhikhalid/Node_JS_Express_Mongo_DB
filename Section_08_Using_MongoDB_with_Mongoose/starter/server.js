const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");

// console.log(app.get('env'));
dotenv.config({ path: "./config.env" }); //read environment variables from config.env file and save them into node js environment variable

const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then((con) => {
    console.log(con.connection);
    console.log("DB connection successful!");
});

const tourSchema = new mongoose.Schema({
    // name: String,
    name: {
        type: String,
        required: [true, "A tour must have a name"],
        unique: true,
    },
    rating: {
        type: Number,
        default: 4.5,
        min: [1, "Rating must be above 1.0"],
        max: [5, "Rating must be below 5.0"],
    },
    // price: Number,
    price: {
        type: Number,
        required: [true, "A tour must have a price"],
    },
});

//we have defined a schema, now we need to create a model
//always use Uppercase for model names; it's a convention
//model is a class that we can use to create and read documents from the collection
const Tour = mongoose.model("Tour", tourSchema);

// console.log(process.env);

//4) START SERVER
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});


