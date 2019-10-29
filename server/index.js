const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const session = require("express-session")
const cors = require("cors")
const mongooseStart = require("./mongoose/configureAndStart")
const errorHandler = require("errorhandler")
const passport = require("passport")
const config = require("./config")

//Configure isProduction variable says if the server is in production state
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

//Mongoose - configure and start
mongooseStart(isProduction)

require("./mongoose/models/Search")
require("./mongoose/models/Pets")
require("./mongoose/models/Users")

require("./config/passport")
//Configure passport library

var apiRouter = require("./routes/api")
app.use("/api", apiRouter)

//Error handler
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
        console.log(err)
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

//Start the server
app.listen(config.PORT, () =>
    console.log("Server running at port " + config.PORT)
)
