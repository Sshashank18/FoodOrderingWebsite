const passport=require('passport')
const localstrategy=require('passport-local').Strategy
const FacebookStrategy=require('passport-facebook').Strategy
const InstagramStrategy = require('passport-instagram').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy
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
}));


    passport.use(new FacebookStrategy({
        clientID: '489754768482846',
        clientSecret: 'a8ee45c48a6b6cead5739183e6d4a978',
        callbackURL: 'http://localhost:4500/login/facebook/callback',
    }, (accessToken, refreshToken, profile, done) => {
        users.findOrCreate({
            where: {
                email: profile.id,
                username: profile.displayName,
                password: profile.id,
                phoneno: " ",
                address: " "
            }
        })
            .then((user) => done(null, user[0].get()))
            .catch(err => console.log(err));
    }))

    passport.use(
        new InstagramStrategy({
        clientID: 'b9b34cf0902d4ed3a4a0c22096509575',
        clientSecret: '7875b1ec0644439e80ed58c592312777',
        callbackURL: "http://localhost:4500/auth/instagram/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        // console.log(profile);
        users.findOrCreate({
            where: {
                email: profile.id,
                username: profile.displayName,
                password: profile.id,
                phoneno: " ",
                address: " "
            }
        })
            .then((user) => done(null, user[0].get()))
            .catch(err => console.log(err));
      }
    ));

    passport.use(new GoogleStrategy({
        callbackURL: 'http://localhost:4500/login/google/return',
        passReqToCallback: true,
        clientID: "473417843783-smd372mi962m1biispkg84ocsfm1lsbd.apps.googleusercontent.com",
        clientSecret: "TShCPKcImKviHHUEaWC8scPA",
        scope: "https://mail.google.com"
      },
      function(request, accessToken, refreshToken, profile, done) {
        console.log(profile);
        // users.findOrCreate({
        //     where: {
        //         email: profile.id,
        //         username: profile.displayName,
        //         password: profile.id,
        //         phoneno: " ",
        //         address: " "
        //     }
        // })
        //     .then((user) => done(null, user[0].get()))
        //     .catch(err => console.log(err));
        
      }
    ));


passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((userId,done)=>{
    users.findOne({
        where:{
            id: userId
        }
    })
    .then((user)=>done(null,user))
    .catch(done)
})

module.exports=passport;