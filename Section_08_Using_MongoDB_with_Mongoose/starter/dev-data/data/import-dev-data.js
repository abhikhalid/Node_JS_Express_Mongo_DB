const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");

const Tour = require("../../models/tourModel");

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


//READ JSON FILE
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

//IMPORT DATA INTO DB
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log("Data successfully loaded!");
    } catch (err) {
        console.log(err);
    }

    process.exit(); //exit the process after the data is imported
}

//DELETE ALL DATA FROM DB
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log("Data successfully deleted!");
    } catch (err) {
        console.log(err);
    }

    process.exit(); //exit the process after the data is imported
}

if (process.argv[2] === "--import") {
    importData();
}
else if (process.argv[2] === "--delete") {
    deleteData();
}

console.log(process.argv); //to see the command line arguments