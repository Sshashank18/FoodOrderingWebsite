$(()=>{
    $('#order').click(()=>{
        console.log("inside");
        $.get('/home');
    })
})