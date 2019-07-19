const express=require('express')
const {users}=require('./database')
const session=require('express-session')
const passport=require('./passport')

const app=express()

app.use(session({
    secret:'Food is the key',
    resave:false,
    saveUninitialized:true
}))

app.use(passport.initialize())
app.use(passport.session())

// app.use('/login',express.static(__dirname+'signup/login.html'))
// app.use('/signup',express.static(__dirname+'signup/signup.html'))

app.use(express.static('public'))

app.set('view engine','hbs')

app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/signup',(req,res)=>{
    res.render('signup')
})

app.post('/login',
    passport.authenticate('local',{
        successRedirect:'/home',
        failureRedirect:'/login'
    })
)

app.post('/signup',(req,res)=>{
    console.log(req.body)
    users.create({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        address:req.body.address,
        state:req.body.state
    }).then((user)=>{
        console.log(user)
        res.redirect('/login')
    }).catch(err=>{
        console.error(err)
        res.redirect('/signup')
    })
})

function checkLoggedin(req,res){
    if(req.user)
        return next()
    res.redirect('/login')
}

app.get('/home',checkLoggedin,(req,res)=>{
    res.send('Welcome')
})

app.listen(4500,()=>{
    console.log('Server started at http://localhost:4500')
})

