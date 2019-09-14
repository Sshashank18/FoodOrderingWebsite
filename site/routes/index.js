const express = require("express");
const router=express.Router();

const {getAllRestaraunts}=require('./../database/restarauntdb')

router.get('/type/:foodtype',(req,res)=>{
    
    var type=req.params.foodtype;
    var time=type.split(" ")[0];
    var food=type.split(" ")[1];
    getAllRestaraunts()
    .then(restaraunt => {
        let requiredRes=restaraunt.filter((restaraunt)=>{
            if(time=="Breakfast"){
                if(restaraunt.FoodTimeBreakfast==true){
                    if(food=="Veg"){
                        if(restaraunt.FoodVeg==true)
                            return restaraunt;
                    }
                    else if (food=="Non-Veg"){
                        if(restaraunt.FoodNonVeg==true)
                            return restaraunt;
                    }
                    else if(food=="Egg"){
                        if(restaraunt.FoodEgg==true)
                            return restaraunt;
                    }
                }
            }
            else if(time=="Lunch"){
                if(restaraunt.FoodTimeLunch==true){
                    if(food=="Veg"){
                        if(restaraunt.FoodVeg==true)
                            return restaraunt;
                    }
                    else if (food=="Non-Veg"){
                        if(restaraunt.FoodNonVeg==true)
                            return restaraunt;
                    }
                    else if(food=="Egg"){
                        if(restaraunt.FoodEgg==true)
                            return restaraunt;
                    }
                }
            }
            else if(time=="Dinner"){
                if(restaraunt.FoodTimeDinner==true){
                    if(food=="Veg"){
                        if(restaraunt.FoodVeg==true)
                            return restaraunt;
                    }
                    else if (food=="Non-Veg"){
                        if(restaraunt.FoodNonVeg==true)
                            return restaraunt;
                    }
                    else if(food=="Egg"){
                        if(restaraunt.FoodEgg==true)
                            return restaraunt;
                    }
                }
            }
            
        })
        res.render('restaraunt', {requiredRes});
    })
})

router.get('/type/:foodtype/filtered/:value',async (req,res)=>{
    var Name=req.params.value;
    getAllRestaraunts()
    .then(async (restaraunts) => {
        let filteredRes = restaraunts.filter((restaraunt) => {
            if(restaraunt.FoodType == Name)
                return restaraunt;
        })
        res.send(filteredRes);
    })
    
})

router.get('/type/:foodtype/order/:name',async (req,res)=>{
    var Name=req.params.name;

    getAllRestaraunts()
    .then(async (restaraunts)=>{
        let selectedRes=restaraunts.filter((restaraunt)=>{
            if(restaraunt.Name == Name)
                return restaraunt;
        })
        res.render('orderingrestaraunt',{selectedRes});
    })
})

module.exports=router;
