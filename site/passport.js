const passport=require('passport')
const localstrategy=require('passport-local').Strategy
const FacebookStrategy=require('passport-facebook').Strategy
const InstagramStrategy = require('passport-instagram').Strategy
const GoogleStrategy = require('passport-google').Strategy
const users=require('./database').users

passport.use(
    new localstrategy({
        usernameField:'email',    //as to change the default parameters
        passwordField:'password'
    },(email,password,done)=>{
        users.findOne({
            where:{
                email, //{email:email}
            },
        }).then((user)=>{
            if(!user) return done(null,false,{message:"Email invalid"})
            if(user.password!=password) return done(null,false,{message:"Wrong Password"})
            done(null,user)
        })
        .catch(done)
}))

passport.use(
    new FacebookStrategy(
        {
        clientID: '510074252855921',
        clientSecret: '5c8cc5db4f4b311324c3843373c81ad1',
        callbackURL: 'http://localhost:4500/login/facebook/callback',
        },
        (accessToken, refreshToken, profile, done) => {
        users.findCreateFind({
            where: {
            email: profile.id,
            },
            defaults: {
            email: profile.id,
            fbAccessToken: accessToken,
            },
        })
            .then((user) => {
            done(null, user)
            })
            .catch(done)
        },
    ),
    )

    passport.use(
        new InstagramStrategy({
        clientID: '20e575bdf29e4d539993c4948bed639a',
        clientSecret: 'f14da32d03a640f8899fe4dd09e2f810',
        callbackURL: "http://127.0.0.1:3000/login/instagram/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        users.findOrCreate({ email: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

    passport.use(new GoogleStrategy({
        returnURL: 'http://localhost:4500/login/google/return',
        realm: 'http://localhost:4500/'
      },
      function(identifier, done) {
        Users.findByOpenID({ openId : identifier }, function (err, user) {
          return done(err, user);
        });
      }
    ));


passport.serializeUser((users,done)=>{
    done(null,users.id)
})

passport.deserializeUser((userId,done)=>{
    users.findOne({
        where:{
            id:userId
        }
    }).then((user)=>done(null,user))
    .catch(done)
})

module.exports=passport;