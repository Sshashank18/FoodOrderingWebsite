$(()=>{
    
    // SIDE BAR
    let sidebarExpandButton = $(".sidebar-unexpanded");
    let sidebar = $(".sidebar")[0];
    let sideHide=$('#sidehide');
    
    sidebarExpandButton[0].addEventListener("click", function()
    {
        let classList = sidebar.getAttribute("class");
        if(classList.includes("active"))
        {
            sidebar.classList.remove("active");
            
        }
        else 
        {
            sidebar.classList.add("active");
        }
        
    });
    sideHide.click(()=>{
        let classList = sidebar.getAttribute("class");
        if(classList.includes("active"))
        {
            sidebar.classList.remove("active");
        }
    })
    
    // FOOD BUTTON
    $('#btnfoodb').click(()=>{
        $('.hide2b').show();
        $('.hide2l').hide()
        $('.hide2d').hide()
    })
    $('#btnfoodl').click(()=>{
        $('.hide2l').show();
        $('.hide2b').hide()
        $('.hide2d').hide()
    })
    $('#btnfoodd').click(()=>{
        $('.hide2d').show();
        $('.hide2l').hide()
        $('.hide2b').hide()
    })
    
    // CHOOSING FOOD TYPE
    let foodchose=$('.foodchose');
    let veg=$('.veg');
    let egg=$('.egg');
    let nonveg=$('nonveg');
    setInterval(()=>{
        for(let i=0;i<foodchose.length;i++){
        foodchose.click(()=>{
            if(foodchose[i].innerText=="Veg"){
                let classList = foodchose[i].getAttribute("class");
                if(classList.includes("active2"))
                {
                    foodchose[i].classList.remove("active2");
                    veg.css("color","blue");
                }
                else{
                    foodchose[i].classList.add("active2");
                    veg.css("color","green");
                }
            }
            
            if(foodchose[i].innerText=="Egg"){
                let classList = foodchose[i].getAttribute("class");
                if(classList.includes("active2"))
                {
                    foodchose[i].classList.remove("active2");
                    egg.css("color","blue");
                }
                else{
                    foodchose[i].classList.add("active2");
                    egg.css("color","green");
                }
            }
            else{
                let classList = foodchose[i].getAttribute("class");
                if(classList.includes("active2"))
                {
                    foodchose[i].classList.remove("active2");
                    nonveg.css("color","blue");
                }
                else{
                    foodchose[i].classList.add("active2");
                    nonveg.css("color","green");
                }
                
            }
        })
    }
},5)
})
