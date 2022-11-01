const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const Student = require('../models/student')

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.clientId,
    clientSecret: process.env.clientSecret,
    callbackURL: '/google/callback'
  },
  async function(accessToken, refreshToken, profile, done) {
    try{
      // console.log(profile)
      let student = await Student.
                      findOne({'email': profile._json.email})
                      .catch((err) => {console.log(err)})

      if(!student){
        student = new Student({
          'email': profile._json.email,
          'id' : profile._json.id
        })
        await student.save()

        return done(null,student)
      }
      return done(null)

    }catch(err){
      console.log(err)
      return done(null,err)
    }
    
  }
));
 