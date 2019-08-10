$(()=>{

    //                                    FILTERING RESTARAUNTS

    let restas = $(".resta");
    restas.each((index) => {
        restas[index].addEventListener("click", (event) => {
            let value = event.target.value;
            $.get('/restaraunt/filtered/' + value, (filteredRestaraunts) => {
                let list = $('.mitem');
                list.empty();
                
                filteredRestaraunts.map((restaraunt) => {
                    list.append(`
                    <div class="mlist">
                    <img class="card-img-top" src="CSS/images/logobg4.jpg" alt="Card image cap">
                    <div class="card-body mbody">
                    <h5 class="card-title title">${restaraunt.Name}</h5>
                    <p class="card-text">${restaraunt.Rating} Star</p>
                    <a href="#" class="btn btn-success order">Order Now</a>
                    </div>
                    </div>
                    `)
                })
            })
        })
    })
    


    //                                          ORDERING FROM RESTARAUNT

    
    
    $('.order').each((index)=>{
        $('.order')[index].addEventListener("click", (event) => {
            let  restaclicked=event.target.value;
            $.get('/restaraunt/order/'+ restaclicked,()=>{
                console.log('success');
            });
        })
    })
    
})