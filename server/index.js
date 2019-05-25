const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
const passport = require('passport');

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//Initiate our app
const app = express();


//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  //Todo
  secret: "CAMBIAR ACA",
  cookie: {
    maxAge: 60000
  },
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize())

if (!isProduction) {
  app.use(errorHandler());
}

//Configure Mongoose
mongoose.connect('mongodb://127.0.0.1/pets', {
  useNewUrlParser: true
});
mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);

//Models and routes
require('./models/Pets');
require('./models/Users');
require('./config/passport');

var apiRouter = require("./routes/api")
app.use('/api', apiRouter);


//Error handlers & middlewares
app.use(function (e, req, res, next) {
  console.log(e);
  if (e.status) {
    res.status(e.status).send(e.objectForClient);
  } else {
    res.status(500).send({
      message: e.message
    });
  }
});
// if (!isProduction) {
//   app.use((err, req, res) => {
//     res.sendStatus(err.status || 500);

//     res.json({
//       errors: {
//         message: err.message,
//         error: err,
//       },
//     });
//   });
// } else {
//   app.use((err, req, res) => {
//     res.status(err.status || 500);

//     res.json({
//       errors: {
//         message: err.message,
//         error: {},
//       },
//     });
//   });
// }


app.listen(3000, () => console.log('Server running on http://localhost:3000/'));