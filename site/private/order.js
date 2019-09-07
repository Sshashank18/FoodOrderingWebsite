$(()=>{
    var container=document.getElementById('container');
    $.get('/myOrders',(data)=>{
        console.log(data[0].RestaName);
        container.append(`
            <div class="item">
                Restaraunt Name:${data.RestaName}
                <br>Food Name :${data.foodName}
                <br>Quantity :${data.quantity}
                <br>Price :${data.price}*${data.quantity}
            </div>
        `)
    })
})