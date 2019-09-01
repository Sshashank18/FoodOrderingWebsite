const express=require('express')
const {users}=require('./database')
const {cartItems}=require('./database')
const session=require('express-session')
const passport=require('./passport')
const routingrestaraunt=require('./routes');

const app=express()

var user;

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret:'Food is the key',
    resave:false,
    saveUninitialized:true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('./public'));

app.use("/home",checkLoggedin, express.static('./private'));


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
        phoneno:req.body.phoneno
    }).then((user)=>{
        res.redirect('/login')
    }).catch(err=>{
        console.error(err)
        res.redirect('/signup')
    })
})

app.patch("/user/update", (req, res) => {
    users.update({
        username:req.body.name,
        address:req.body.address,
        phoneno:req.body.phone
    },
    {
        where: {
            id: req.user.id
        }
    })
    res.sendStatus(200);
})

app.get('/payment',(req,res)=>{
    // cartItems.findAll({
    //     where: {
    //         UserId: req.user.id 
    //     },
    //     attributes: ["RestaName", "foodName", "quantity", "price"],
    //     // include: [users]
    // })
    // .then(cartItems => {

    //     console.log(cartItems);
    // }),{user:req.user, cartItems}
    res.render('payment',{user:req.user});

});

app.get("/getUser", (req , res) => {
    res.send(req.user.username);
})

app.post('/payment',(req,res)=>{
    
    // console.log(req.body);
    
    Promise.all(req.body.foodItems.map(item => {
        return cartItems.create({
            RestaName: req.body.resname,
            foodName: item.foodName,
            quantity: item.quantity,
            UserId: req.user.id,
            price: item.pricePerItem
        })
    }))
    .then(() => res.sendStatus(200));

                            
    
})


function checkLoggedin(req,res,next){
    if(req.user)
    {   
        return next()
    }        
    res.redirect('/login')
}


app.use('/restaraunt',routingrestaraunt);

app.listen(4500,()=>{
    console.log('Server started at http://localhost:4500')
})

