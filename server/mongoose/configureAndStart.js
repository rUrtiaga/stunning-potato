const mongoose = require("mongoose")
const config = require("../config")

module.exports = async isProduction => {
    //Configure mongoose's promise to global promise
    mongoose.promise = global.Promise

    const db = mongoose.connection
    const options = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
        reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
        connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
        socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
    }

    //Actions to show status for mongoDB server connection
    db.on("connecting", function() {
        console.log("connecting to MongoDB...")
    })
    db.on("error", function(error) {
        console.error("Error in MongoDb connection: " + error)
        mongoose.disconnect()
    })
    db.on("connected", function() {
        console.log("MongoDB connected!")
    })
    db.once("open", function() {
        console.log("MongoDB connection opened!")
    })
    db.on("reconnected", function() {
        console.log("MongoDB reconnected!")
    })
    //When status of dbConnection is disconnected, try to reconnect every some time
    db.on("disconnected", () => {
        console.log("MongoDB disconnected!")
        if (isProduction) {
            setTimeout(async function() {
                console.log("MongoDB disconnected!")
                await mongoose.connect(config.MONGO_URL, options)
            }, 5000)
        }
    })
    //Moongoose db set debugger only if production mode is disabled
    mongoose.set("debug", !isProduction)
    //First try to connect to mongoDB server
    await mongoose.connect(config.MONGO_URL, options).catch(e => {
        console.log("DB connect ERROR", e)
    })

    //Models and routes
    require("./models/Search")
    require("./models/Pets")
    require("./models/Users")
    return mongoose
}
