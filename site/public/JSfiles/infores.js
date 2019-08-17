$(()=>{
      
    let total=0;
    let foodItems = [];
    let add=$('.add');
    add.each((index)=>{
        add[index].addEventListener('click',(event)=>{
            const name=event.target.getAttribute("data-name");
            const price=parseInt(event.target.getAttribute("data-price"));
            total+=price;
            let order=$('#order');
            foodItems.push({foodName: name, quantity: 1});
            order.append(`
                <div class="cartite">
                    <div class="item">${name}</div>
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-outline-success decr">-</button>
                        <button type="button" class="btn btn-secondary">1</button>
                        <button type="button" class="btn btn-outline-success incr">+</button>
                        <div class="price" value="${price}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹${price}</div>
                    </div><br>
                </div>
            `)
            let taxprice=(total*8.9)/100;
            let ntotal=total+taxprice;
            $('#subtotal').text("₹"+total);
            $('#totalam').text("₹"+ntotal);
            let resname=$('#ResName').text();
            let confirm=$('#confirm');
            confirm.click(()=>{
                $.post("/payment", {
                    resname: resname,
                    foodItems: foodItems                   
                })
            })
        })
    })


    $(document).on("click", ".incr", (event)=>{
        let val=event.target.previousElementSibling;
        let incrval=parseInt(val.innerText);
        let nprice=parseInt(event.target.nextElementSibling.getAttribute("value"));
        total+=nprice;
        let taxprice=(total*8.9)/100;
        let ntotal=total+taxprice;
        $('#subtotal').text("₹"+total);
        $('#totalam').text("₹"+ntotal);
        incrval++;
        let fname=event.target.parentNode.previousElementSibling.innerText;
        foodItems.map(foodItem => {
            if(foodItem.foodName == fname)
                foodItem.quantity++;
        })
        let dprice=incrval*nprice;
        event.target.nextElementSibling.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+"₹"+dprice;
        val.innerText=incrval;
    })

    $(document).on("click",".decr",(event)=>{
        let fname=event.target.parentNode.previousElementSibling.innerText;
        let val=event.target.nextElementSibling;
        let decrval=parseInt(val.innerText);
        let nprice=parseInt(val.nextElementSibling.nextElementSibling.getAttribute("value"));
        total-=nprice;
        if(total>=0){
            let taxprice=(total*8.9)/100;
            let ntotal=total+taxprice;
            $('#subtotal').text("₹"+total);
            $('#totalam').text("₹"+ntotal);
        }
        if(decrval-1==0){
            foodItems=foodItems.filter((foodItem) => {
                return foodItem.foodName != fname;
            }) 
            val.parentNode.parentNode.remove();
        }
        else{
            decrval-=1;
            foodItems.map(foodItem => {
                if(foodItem.foodName == fname)
                    foodItem.quantity--;
            }) 
            val.innerText=decrval;
        }
        let dprice=decrval*nprice;
        val.nextElementSibling.nextElementSibling.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+"₹"+dprice;
    })
})