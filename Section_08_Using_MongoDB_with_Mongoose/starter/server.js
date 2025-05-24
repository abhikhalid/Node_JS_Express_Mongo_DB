const dotenv = require("dotenv");
// console.log(app.get('env'));
dotenv.config({ path: "./config.env" }); //read environment variables from config.env file and save them into node js environment variable
const app = require("./app");




// console.log(process.env);

//4) START SERVER
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});


