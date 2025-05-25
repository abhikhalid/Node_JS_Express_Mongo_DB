const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");
const Tour = require("./models/tourModel");

// console.log(app.get('env'));
dotenv.config({ path: "./config.env" }); //read environment variables from config.env file and save them into node js environment variable

const app = require("./app");



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


// console.log(process.env);

//4) START SERVER
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});


