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
    
    
    var tof="";
    
    // FOOD BUTTON
    $('#btnfoodb').click(()=>{
        tof="";
        tof+="Breakfast ";
        $('.hide2b').show();
        $('.hide2l').hide()
        $('.hide2d').hide()
    })
    $('#btnfoodl').click(()=>{
        tof="";
        tof+="Lunch ";
        $('.hide2l').show();
        $('.hide2b').hide()
        $('.hide2d').hide()
    })
    $('#btnfoodd').click(()=>{
        tof="";
        tof+="Dinner ";
        $('.hide2d').show();
        $('.hide2l').hide()
        $('.hide2b').hide()
    })
    
    
    let type = $(".type");
    type.each((index) => {
        type[index].addEventListener("click", (event) => {
            let type=event.target.value;
            tof+=type;
            let foodtype = tof;
            console.log(tof);
            window.location = "/restaraunt/type/" + foodtype;
        })
        
    })
    

})
