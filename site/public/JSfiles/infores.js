$(()=>{
      
    let total=0;
    let foodItems = [];
    let ntotal = 0;
    let coupapp=0;
    let resname=$('#ResName').text();

    let add=$('.add');
    add.each((index)=>{
        add[index].addEventListener('click',(event)=>{
            const name=event.target.getAttribute("data-name");
            const price=parseInt(event.target.getAttribute("data-price"));
            
            total+=price;
            let order=$('#order');
            coupapp=0;
            $('#applied').hide();

            if(foodItems.length == 0){
              
                foodItems.push({foodName: name, quantity: 1,pricePerItem:`${price}`});
                order.append(`
                    <div class="cartite">
                        <div class="item">${name}</div>
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-outline-success decr">-</button>
                            <button type="button" class="btn btn-secondary quantityValue">1</button>
                            <button type="button" class="btn btn-outline-success incr">+</button>
                            <div class="price" value="${price}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹${price}</div>
                        </div><br>
                    </div>
                `)
            } 
            else {
        
                let bExist = false;
                foodItems.map((foodItem, index) => {
                    // console.log(foot)
                    if(foodItem.foodName == name)
                    {
                        foodItem.quantity++;
                        $(".quantityValue")[index].innerText = parseInt($(".quantityValue")[index].innerText) + 1;
                        bExist = true;
                        
                    }
                    
                })

                if(!bExist)
                {
                    foodItems.push({foodName: name, quantity: 1, pricePerItem: `${price}`});
                    order.append(`
                        <div class="cartite">
                            <div class="item">${name}</div>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-outline-success decr">-</button>
                                <button type="button" class="btn btn-secondary quantityValue">1</button>
                                <button type="button" class="btn btn-outline-success incr">+</button>
                                <div class="price" value="${price}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹${price}</div>
                            </div><br>
                        </div>
                    `)
                }
                
            }
           
            let taxprice=(total*8.9)/100;
            ntotal=total+taxprice;
            $('#subtotal').text("₹"+total);
            $('#totalam').text("₹"+ntotal.toPrecision(5));
            $("#Discountedt").text("₹"+ntotal.toPrecision(5));
        })
    })

    let coupon=$('#code');
    let apply=$('#apply');
    apply.click((e)=>{
        let couponValue = coupon.val();
        if(coupapp==0){
            if(couponValue=="NEW50" || couponValue=="FIRST"){
                if(ntotal>100){
                    ntotal-=ntotal/4;
                    $("#Discountedt").text("₹"+ntotal.toPrecision(5));
                    coupapp=1;
                }
                else{
                    $('#ntotal').text("Order is below ₹100.No coupons valid");
                }
            }
        }
        else{
            $('#applied').show();
            $('#applied').text("ALREADY APPLIED");
        }
    
    })

    $(document).on("click", ".incr", (event)=>{
        coupapp=0;
        $('#applied').hide();
        let val=event.target.previousElementSibling;
        let incrval=parseInt(val.innerText);
        let nprice=parseInt(event.target.nextElementSibling.getAttribute("value"));
        total+=nprice;
        let taxprice=(total*8.9)/100;
        ntotal=total+taxprice;
        $('#subtotal').text("₹"+total);
        $('#totalam').text("₹"+ntotal.toPrecision(5));
        $("#Discountedt").text("₹"+ntotal.toPrecision(5));
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
        coupapp=0;
        $('#applied').hide();
        let fname=event.target.parentNode.previousElementSibling.innerText;
        let val=event.target.nextElementSibling;
        let decrval=parseInt(val.innerText);
        let nprice=parseInt(val.nextElementSibling.nextElementSibling.getAttribute("value"));
        total-=nprice;
        if(total>=0){
            let taxprice=(total*8.9)/100;
            ntotal=total+taxprice;
            $('#subtotal').text("₹"+total);
            $('#totalam').text("₹"+ntotal.toPrecision(5));
            $("#Discountedt").text("₹"+ntotal.toPrecision(5));
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

    let confirm=$('#confirm');
    confirm.click(()=>{
        var totalpr=$('#Discountedt').text();
        $.post("/addToCart", {
            resname: resname,
            foodItems: foodItems,              
        }, () => {
            window.location = `/payment/${totalpr.split('₹')[1]}`;
            // window.location="/payment";
        })
    })

})