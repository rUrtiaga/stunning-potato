const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const session = require("express-session")
const cors = require("cors")
const mongoose = require("mongoose")
const errorHandler = require("errorhandler")
const passport = require("passport")
const config = require("./config")

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === "production"

//Initiate our app
const app = express()

//Configure our app
app.use(cors())
app.use(require("morgan")("dev"))
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")))
app.use(
    session({
        secret: config.SESSION_SECRET_TOKEN,
        cookie: {
            maxAge: 60000
        },
        resave: false,
        saveUninitialized: false
    })
)
app.use(passport.initialize())

if (!isProduction) {
    app.use(errorHandler())
}

//Configure Mongoose

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
    setTimeout(function() {
        console.log("MongoDB disconnected!")
        mongoose.connect(config.MONGO_URL, options)
    }, 5000)
})
//Moongoose db set debugger only if production mode is disabled
mongoose.set("debug", isProduction)
//First try to connect to mongoDB server
mongoose.connect(config.MONGO_URL, options).catch(e => {
    console.log("DB connect ERROR", e)
})

//Models and routes
require("./models/Search")
require("./models/Pets")
require("./models/Users")
require("./config/passport")

var apiRouter = require("./routes/api")
app.use("/api", apiRouter)

//Error handlers & middlewares
// app.use(function (e, req, res, next) {
//   console.log(e);
//   if (e.status) {
//     res.status(e.status).send(e.objectForClient);
//   } else {
//     res.status(500).send({
//       message: e.message
//     });
//   }
// });
if (!isProduction) {
    app.use((err, req, res, next) => {
        console.log(err)
        if (res.headersSent) {
            return next(err)
        }
        res.status(err.status || 500)

        res.json({
            errors: {
                message: err.msj || err.message,
                error: err
            }
        })
    })
} else {
    app.use((err, req, res, next) => {
        if (res.headersSent) {
            return next(err)
        }
        res.status(err.status || 500)

        res.json({
            errors: {
                message: err.msj || err.message,
                error: {}
            }
        })
    })
}

app.listen(config.PORT, () =>
    console.log("Server running at port " + config.PORT)
)
