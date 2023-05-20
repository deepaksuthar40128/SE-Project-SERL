const express = require('express');
const passport = require('passport');
const user = require('../model/user');
const bcryptjs = require('bcryptjs');
const app = express();
require('./passportLocal')(passport);
require('./googleAuth')(passport);
const FacultyData = require('../model/faculty');
const randomstring = require("randomstring");
const ResearcherData = require('../model/researchers')
const Webdata = require('../model/webdata');
const { join } = require('path');
const { sendResetEmail } = require('./sendMail');
const tokens = require('../model/tokens');
// const userRoutes = require('./accountRoutes');

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
        next();
    } else {
        req.flash('error_messages', "Please Login to continue !");
        res.redirect('/login');
    }
}

app.get('/reset-password', async (req, res) => {
    let token = req.query.token;
    let data = await tokens.findOne({ token });
    if (data) {
        res.render("rpass", { csrfToken: req.csrfToken() });
    } else {
        res.send("NOT A VALID TOKEN!");
    }

})


app.post('/resetPass', (req, res) => {
    
})

app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.render("home", { logged: true, role: req.user.role, csrfToken: req.csrfToken() });
    } else {
        console.log("Here");
        res.render("home", { logged: false });
    }
})
app.get('/faculty', (req, res) => {
    if (req.isAuthenticated()) {
        res.render("faculty", { logged: true, role: req.user.role, csrfToken: req.csrfToken() });
    } else {
        res.render("faculty", { logged: false, csrfToken: req.csrfToken() });
    }
})
app.get('/researcher', (req, res) => {
    if (req.isAuthenticated()) {
        res.render("researcher", { logged: true, role: req.user.role, csrfToken: req.csrfToken() });
    } else {
        res.render("researcher", { logged: false, csrfToken: req.csrfToken() });
    }
})
app.get('/project', (req, res) => {
    if (req.isAuthenticated()) {
        res.render("project", { logged: true, role: req.user.role, csrfToken: req.csrfToken() });
    } else {
        res.render("project", { logged: false });
    }
})
app.get('/publications', (req, res) => {
    if (req.isAuthenticated()) {
        res.render("publications", { logged: true, role: req.user.role, csrfToken: req.csrfToken() });
    } else {
        res.render("publications", { logged: false });
    }
})
app.get('/contact', (req, res) => {
    if (req.isAuthenticated()) {
        res.render("contact", { logged: true, role: req.user.role, csrfToken: req.csrfToken() });
    } else {
        res.render("contact", { logged: false });
    }
})
app.get('/resources', (req, res) => {
    if (req.isAuthenticated()) {
        res.render("resources", { logged: true, role: req.user.role, csrfToken: req.csrfToken() });
    } else {
        res.render("resources", { logged: false });
    }
})

app.get('/login', (req, res) => {
    res.render("login", { csrfToken: req.csrfToken() });
})

app.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/',
        failureFlash: true,
    })(req, res, next);
})

app.post('/signup', async (req, res) => {
    let data = await user.findOne({ email: req.body.email });
    if (data) {
        res.render("signup", { err: "user already exist", csrfToken: req.csrfToken() });
    }
    else {
        bcryptjs.genSalt(12, (err, salt) => {
            if (err) throw err;
            bcryptjs.hash(req.body.password, salt, async (err, hash) => {
                if (err) throw err;
                newData = new user({
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                    facebookId: null,
                    googleId: null,
                    provider: 'email',
                })
                newData = await newData.save();
                res.redirect('/login');
            })
        });
    }
})

app.post('/addFaculty', async (req, res) => {
    body = req.body;
    body['password'] = randomstring.generate(7);
    body['role'] = "faculty";
    let data = new FacultyData(body);
    data = await data.save();
    let token = randomstring.generate();
    await (new tokens({ email: body.email, token })).save();
    await sendResetEmail(body.email, token)
    res.send(data);
})

app.get('/logout', (req, res) => {
    req.logout(function (err) {
        req.session.destroy(function (err) {
            res.redirect('/');
        });
    });
});

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email',] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', failureFlash: true }), (req, res) => {
    res.redirect('/');
})

// app.use(userRoutes);
app.get('/allidsFaculty', async (req, res) => {
    let data = await FacultyData.aggregate([
        {
            '$project': {
                'createdAt': 1
            }
        }, {
            '$sort': {
                'createdAt': -1
            }
        }
    ]);
    console.log(data);
    res.send(data);
})

app.get('/faculty/:id', async (req, res) => {
    let data = await FacultyData.findById(req.params.id);
    console.log(data);
    res.send(data);
})
app.get('/deleteFaculty/:id', async (req, res) => {
    await FacultyData.findByIdAndDelete(req.params.id);
    res.send("deleted");
})
module.exports = app;


//researcher

app.post('/addResearcher', async (req, res) => {
    body = req.body;
    body['password'] = randomstring.generate(7);
    body['role'] = "researcher";
    let data = new ResearcherData(body);
    data = await data.save();
    res.send(data);
})

app.get('/allidsResearcher', async (req, res) => {
    console.log("me")
    let data = await ResearcherData.aggregate([
        {
            '$project': {
                'createdAt': 1
            }
        }, {
            '$sort': {
                'createdAt': -1
            }
        }
    ]);
    console.log(data);
    res.send(data);
})
app.get('/researcher/:id', async (req, res) => {
    console.log(req.params.id)
    let data = await ResearcherData.findById(req.params.id);
    console.log(data);
    res.send(data);
})
app.get('/deleteResearcher/:id', async (req, res) => {
    await ResearcherData.findByIdAndDelete(req.params.id);
    res.send("deleted");
})

app.get('/allData', async (req, res) => {
    console.log("me");
    let data = await Webdata.find();
    res.send(data);
})

app.post('/addNews', async (req, res) => {
    console.log(req.body.news);
    data = await Webdata.updateOne(
        { _id: '6435a427aa05873f6da802c3' },
        { $push: { News: req.body.news } }
    )
    data = await Webdata.find();
    res.send(data);
})

app.get('/getResearcher_details/:id', async (req, res) => {
    data = await ResearcherData.findById(req.params.id);
    res.send(data);
})


//profile

app.get('/profile', async (req, res) => {
    let data = await ResearcherData.findById(req.query.id);
    if (!data) {
        data = await FacultyData.findById(req.query.id);
        if (!data) {
            req.flash('error_messages', "Invalid URL Access!");
            res.redirect('/');
            return;
        }
    }
    res.render('profile', { email: data.email, username: data.username, profile: data.profile });
})


app.get('/getUser', checkAuth, (req, res) => {
    res.status(200).json(req.user);
})


module.exports = app;