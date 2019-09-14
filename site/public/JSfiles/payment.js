
    var name,phone,address;

    $('#apply').click(()=>{
        
        name=document.getElementById('name').value;
        phone=document.getElementById('phone').value;
        address=document.getElementById('address').value;
        let Name=document.getElementById('Name');
        let Phone=document.getElementById('Phone');
        let Address=document.getElementById('Address');

        if(name!=""){
            
            Name.innerText=name;
        }
        if(phone!=""){
            
            Phone.innerText=phone;
        }
        if(address!=""){
            
            Address.innerText=address;
        }
        $.ajax({
            url: "/user/update",
            type: "PATCH",
            data: {
                name: Name.innerText,
                phone: Phone.innerText,
                address: Address.innerText 
            }
        })

        
    })

    $('#pay').click(()=>{
        $.post("/payment")
        .then(() => {
            window.location='/home';
        })
        
    })
    

