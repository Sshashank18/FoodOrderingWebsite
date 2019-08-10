const express=require('express')
const {users}=require('./database')
const session=require('express-session')
const passport=require('./passport')
const routingrestaraunt=require('./routes');

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret:'Food is the key',
    resave:false,
    saveUninitialized:true
}))

app.use(passport.initialize())
app.use(passport.session())

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
        failureRedirect:'/login',
        // failureFlash:true
    })
)

app.post('/signup',(req,res)=>{
    users.create({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        address:req.body.address,
        state:req.body.state
    }).then((user)=>{
        res.redirect('/login')
    }).catch(err=>{
        console.error(err)
        res.redirect('/signup')
    })
})

function checkLoggedin(req,res,next){
    if(req.user)
    {
        return next()
    }        
    res.redirect('/login')
}

app.get('/home',checkLoggedin,(req,res)=>{
    res.send('Welcome')
})

app.use('/restaraunt',routingrestaraunt);

app.listen(4500,()=>{
    console.log('Server started at http://localhost:4500')
})
