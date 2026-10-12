const dns = require('dns');

dns.setServers([
  '8.8.8.8',
  '8.8.4.4'
]);

const mongoose = require("mongoose")

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log("Connected to DB");

    } catch (error) {
        console.log(error); 
    }
}

module.exports = connectToDB