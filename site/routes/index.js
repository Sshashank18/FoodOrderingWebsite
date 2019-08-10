const router=require('express').Router();

const {getAllRestaraunts}=require('./../database/restarauntdb')

router.get('/',(req,res)=>{
    getAllRestaraunts()
    .then(restaraunt => {
        res.render('restaraunt', {restaraunt})
    })
})

router.get('/:id',async function(req,res){
    var id = req.params.id;
    let resta= await restaraunt.findAll({id:id}).exec();
    res.render('orderingrestaraunt',{resta:resta});
})

module.exports=router;
