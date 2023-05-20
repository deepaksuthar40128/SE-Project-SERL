const csrf = require('csurf');
const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');
const MemoryStore = require('memorystore')(expressSession)
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: ".env" });

mongoose.connect(
      process.env.MONGO_URL,
      {
            useNewUrlParser: true, useUnifiedTopology: true,
      }, 
      () => {
            console.log("connected to data base");
      }
)

app.use(express.urlencoded({ extended: true }));


app.use(cookieParser('random'));

app.use(expressSession({
      secret: "random",
      resave: true,
      saveUninitialized: true,
      maxAge: 24 * 60 * 60 * 1000,
      store: new MemoryStore(),
}));


const path = require('path');
app.use(express.static(path.join(__dirname + '/static')));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views',);

app.use(csrf());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function (req, res, next) {
      res.locals.success_messages = req.flash('success_messages');
      res.locals.error_messages = req.flash('error_messages');
      res.locals.error = req.flash('error');
      next();
});


app.use(require('./controller/routes'));



app.listen(80, () => {
      console.log('listing at home');
})