require("dotenv").config()  //This loads the variables from your .env file into process.env.
const app = require("./src/app")
const connectToDB = require("./src/config/database")

connectToDB()

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})