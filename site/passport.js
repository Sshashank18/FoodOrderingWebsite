const passport=require('passport')
const localstrategy=require('passport-local').Strategy
const users=require('./database').users

passport.use(
    new localstrategy((email,password,done)=>{
        users.findOne({
            where:{
                email, //{email:email}
            },
        }).then((user)=>{
            if(!user) return done(new Error('Email invalid'))
            if(user.password!=password) return done(null,false,{message:"Wrong Password"})
            done(null,user)
        })
        .catch(done)
}))

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