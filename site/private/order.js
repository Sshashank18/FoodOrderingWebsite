$(()=>{
    var container=document.getElementById('container');
    $.get('/myOrders',(data)=>{
        console.log(data);
        // console.log(data.RestaName);
        data.map(resta => {
            $(container).append(`
                <div class="item">
                    <h5 class="details">Restaraunt Name:</h5>${resta.RestaName}
                    <br><h5 class="details">Food Name:</h5>${resta.foodName}
                    <br><h5 class="details">Quantity:</h5>${resta.quantity}
                    <br><h5 class="details">Price :</h5>₹${resta.price * resta.quantity}
                </div>
            `)
        })
        
    })
})