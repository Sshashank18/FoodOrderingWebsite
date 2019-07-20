const Sequelize=require('sequelize')

const foodorder=new Sequelize('foodorder','root','root',{    //creating database with name foodorder
    host:'localhost',
    dialect:'sqlite',
    storage:'foodorder.db',
    pool:{
        min:0,
        max:6
    },
    // logging: false
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

foodorder.sync()
    .then(()=>{console.log("Database Synced successfullly")})
    .catch((err)=>{console.error("Problem in syncing database")})

module.exports={
    users
}