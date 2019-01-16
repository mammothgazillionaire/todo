// const passport = require('passport')
const Local = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../Models/User');
const keys = require('../config/keys');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    // console.log("serilize");
    done(null, user._id);
  });
      
  passport.deserializeUser(function(_id, done) {
    // console.log("deserilize");
    User.findById(_id, function (err, user) {
      done(err, user);
    });
  });
  
  passport.use(new Local(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, {message: "No such user."}); }
        user.verifyPassword(password, function(err, isMatched) {
          if (!isMatched) {
            return done(null, false)
          }
          return done(null, user);
        }) 
      });
    }
  ));

  passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "http://localhost:8080/auth/google/callback",
    passReqToCallback   : true
    },(request, accessToken, refreshToken, profile, done) => {
      // console.log(accessToken);
        User.findOne({ oauthID: profile.id } ,(err, user) => {
        if(err) return done(err);
        if(!user){
          let user = new User({
             oauthID : profile.id,
             fullname : profile.displayName,
             email: profile.emails[0].value
           });
           user.save((err) => {
             if(err) return err;
             return done(null,user);
           })
        } 
          done(null,user);
        // console.log(profile, "in google strategy");
      });
    }
  ));
}

      
      


