$(()=>{

    //                                    FILTERING RESTARAUNTS

    let restas = $(".resta");
    restas.each((index) => {
        restas[index].addEventListener("click", (event) => {
            const value = event.target.value;
            
            let urlArray = window.location.href.split("/");
            let foodType = urlArray[urlArray.length - 1];
            
            $.get("/restaraunt/type/" + foodType + "/filtered/" + value, (filteredRestaraunts) => {
                let list = $('.mitem');
                list.empty();
        
                filteredRestaraunts.map((restaraunt) => {
                    list.append(`
                        <div class="mlist" value="${restaraunt.FoodType}">
                            <img class="card-img-top" src="${restaraunt.Image}" alt="Card image cap">
                            <div class="card-body mbody">
                                <h5 class="card-title title">${restaraunt.Name}</h5>
                                <p class="card-text">${restaraunt.Rating} ⭐</p>
                                <button class="btn btn-success order" value="${restaraunt.Name}">Order Now</button>
                                
                            </div>
                        </div>
                    `)
                })
                let orderButtons = $('.order');
                orderButtons.each((index)=>{
                    orderButtons[index].addEventListener("click", (event) => {
                        const restaclicked = event.target.value;
                        let urlArray = window.location.href.split("/");
                        let ResType = urlArray[urlArray.length - 1];
                        
                        window.location = '/restaraunt/type/'+ResType+"/order/"+restaclicked;
                    })
                })
            })

        })
    })
    


    //                                          ORDERING FROM RESTARAUNT

    
    let orderButtons = $('.order');
    orderButtons.each((index)=>{
        orderButtons[index].addEventListener("click", (event) => {
            const restaclicked = event.target.value;
            let urlArray = window.location.href.split("/");
            let ResType = urlArray[urlArray.length - 1];
            
            window.location = '/restaraunt/type/'+ResType+"/order/"+restaclicked;
        })
    })
    
})