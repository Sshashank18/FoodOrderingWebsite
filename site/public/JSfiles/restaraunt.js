$(()=>{
    // const {getAllRestaraunts}=require('./../database/restarauntdb')
    
    $('.resta').click(()=>{
        var button=$(this).attr("value");
        console.log(button);
        // getAllRestaraunts()
        // .then(async (restaraunt) => {
        //     let resta= await restaraunt.findAll({Name:button}).exec();  
        //     console.log(resta);
        // })
    })
    
    
    $('.order').click(()=>{
        var name=$('.title').val();
        $.get('/?Restaraunt='+ name);
    })
})