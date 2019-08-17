const Sequelize=require('sequelize')

const foodorder=new Sequelize('foodorder','root','root',{    //creating database with name foodorder
    host:'localhost',
    dialect:'sqlite',
    storage:'Foodordering.db',
    pool:{
        min:0,
        max:6
    },
    logging: false
})

const users=foodorder.define('Users',{    //Creating a Users table in foodorder database
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    username:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    address:{
        type:Sequelize.STRING,
        allowNull:false
    },
    state:{
        type:Sequelize.STRING,
        allowNull:false,
    }

})

const cartItems=foodorder.define('CartItems',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    RestaName:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    foodName:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    quantity:{
        type:Sequelize.INTEGER,
        allowNull:false,
    }

})


cartItems.belongsTo(users);
users.hasMany(cartItems);

foodorder.sync()
    .then(()=>{console.log("Database Synced successfullly")})
    .catch((err)=>console.error(err))

module.exports={
    users,cartItems
}