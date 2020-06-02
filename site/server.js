const express=require('express')
const {users, cartItems, orders}=require('./database')
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

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});

app.get('/login/facebook', passport.authenticate('facebook'));

app.get('/login/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/home',
  failureRedirect: '/login'
}))

app.get('/auth/instagram', passport.authenticate('instagram'))

app.get('/auth/instagram/callback', passport.authenticate('instagram', {
  successRedirect: '/home',
  failureRedirect: '/login'
}))


app.get('/signup',(req,res)=>{
    res.render('signup')
})

app.post('/login',
    passport.authenticate('local',{
        successRedirect:'/home',
        failureRedirect:'/login',
    })
)

app.post('/signup',(req,res)=>{
    users.create({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        address:req.body.address,
        phoneno:req.body.phoneno
    }).then(()=>{
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

app.get('/myorders',(req,res)=>{
    orders.findAll({
        where: {
            UserId: req.user.id 
        },
        attributes: ["RestaName", "foodName", "quantity", "price"],
    })
    .then(cartItems => {
        res.send(cartItems);
    })
})

app.get('/payment/:total',checkLoggedin,(req,res)=>{
    var totalp=req.params.total;
    cartItems.findAll({
        where: {
            UserId: req.user.id 
        },
        attributes: ["RestaName", "foodName", "quantity", "price"],
    })
    .then(cartItems => {
        // console.log(cartItems);
        const newCartItems = cartItems.map(cartItem => cartItem.get());
        const cart = {
            resname: newCartItems[0].RestaName,
            fooditems: [],
            total: totalp
        }
        cart.fooditems = newCartItems.map(cartItem => cartItem.foodName);
        res.render('payment',{user:req.user,cart:cart});    
    });
    
});

app.get("/getUser", (req , res) => {
    res.send(req.user.username);
})

app.post('/addToCart',(req,res)=>{
    Promise.all(req.body.foodItems.map(item => {
        return cartItems.create({
            RestaName: req.body.resname,
            foodName: item.foodName,
            quantity: item.quantity,
            UserId: req.user.id,
            price: item.pricePerItem
        })
    })).then(()=>{
        res.sendStatus(200);
    })
})

app.post("/payment", (req, res) => {
    cartItems.findAll({
        where: {
            UserId: req.user.id 
        }
    })
        .then(items => {
            Promise.all(items.map(item => {
                orders.create({
                    RestaName: item.RestaName,
                    foodName: item.foodName,
                    quantity: item.quantity,
                    UserId: req.user.id,
                    price: item.price
                })
                
            
                
            }))
            .then(() => {
                cartItems.destroy({
                    where: 
                    {
                        UserId: req.user.id
                    }
                })
                res.redirect('/home');
            })
            .catch(console.log);
        });
})


function checkLoggedin(req,res,next){
    if(req.user)
    {   
        return next()
    }        
    res.redirect('/login')
}


app.use('/restaraunt',checkLoggedin,routingrestaraunt);

app.listen(4500,()=>{
    console.log('Server started at http://localhost:4500')
})

