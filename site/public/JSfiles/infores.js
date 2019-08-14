$(()=>{
    var total=0;
    let add=$('.add');
    add.each((index)=>{
        add[index].addEventListener('click',(event)=>{
            const name=event.target.getAttribute("data-name");
            const price=event.target.getAttribute("data-price");
            total+=price;
            let order=$('#order');
            order.append(`
                <div class="item">${name}</div>
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-outline-success decr"id="decr">-</button>
                    <button type="button" class="btn btn-secondary">1</button>
                    <button type="button" class="btn btn-outline-success incr">+</button>
                    <div class="price">&nbsp;&nbsp;&nbsp;&nbsp;₹${price}</div>
                </div><br>
            `)

        })
    })
    console.log(total);
        $('#subtotal').innerHTML=total;
    $('.decr').each((index)=>{
        $('.decr')[index].addEventListener('click',((event)=>{
            console.log("inside")
            console.log(event.target.nextSibling.getAttribute("value"));
        }))
    })
    $('#decr').click((event)=>{
        console.log("inside")
        console.log(event.target.nextSibling.getAttribute("value"));
    })
    
})