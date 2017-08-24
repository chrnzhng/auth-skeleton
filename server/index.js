require('dotenv').config();

const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    passport = require('passport'),
    Auth0Strategy = require('passport-auth0'),
    session = require('express-session'),

    app = express(),
    port = 3001;


app.use(bodyParser.json());
app.use(cors());

app.use(session({
    secret: 'p@ssw0rd',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK
}, function (accessToken, refreshToken, extraParams, profile, done) {

    console.log(profile);

    done(null, profile);
    
}));

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: 'http://localhost:3000/'
}))


app.listen(port, () => {
    console.log(`Now listening on port ${port}.`)
})