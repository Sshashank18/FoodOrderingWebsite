const {connectdb}=require('./restarauntdb')

connectdb("RestarauntsList").then(db =>{
    const restaraunts=db.collection('restaraunts');
    return restaraunts.insertMany([
        {
            Name:'Yellow Bowl',
            FoodTimeBreakfast:true,
            FoodTimeLunch:true,
            FoodTimeDinner:false,
            FoodVeg:true,
            FoodEgg:false,
            FoodNonVeg:false,
            Rating:4,
            FoodType:'North Indian',
            Menu:{
                Breakfast:[
                    {name:"Poha",price:60},
                    {name:"Chole Bhature",price:50},
                    {name:"Aloo Parantha",price:40},
                    {name:"Poori Sabji",price:20},
                    {name:"Veg Sandwich",price:15},
                ],
                MainCourse:[
                    {name:"Dal Makhani",price:70},
                    {name:"Dal Tadka",price:50},
                    {name:"Dum Aloo",price:40},
                    {name:"Paneer Butter Masala",price:110},
                    {name:"Shahi Paneer",price:100},
                    {name:"Kadai Paneer",price:100}
                ],
                Rice:[
                    {name:"Veg Pulao",price:70},
                    {name:"Plain Rice",price:22},
                ],
                Breads:[
                    {name:"Roti",price:4},
                    {name:"Butter Roti",price:6},
                    {name:"Plain Naan",price:17},
                    {name:"Butter Naan",price:22},
                    {name:"Laccha Parantha",price:18},
                ],
                Desserts:[
                    {name:"Jalebi",price:15},
                    {name:"Rasmalai",price:28},
                    {name:"Gulaab Jamun",price:30},
                    {name:"Faluda",price:50},
                ],
                Beverages:[
                    {name:"Pepsi",price:30},
                    {name:"Sprite",price:30},
                    {name:"Slice",price:30},
                    {name:"Mountain Dew",price:30},
                    {name:"Chocolate Shake",price:40},
                    {name:"Strawberry Shake",price:40},
                    {name:"Banana Shake",price:40},
                    {name:"Oreo Shake",price:40},
                ],
            }
            
        },
        {
            Name:'Om Sweets',
            FoodTimeBreakfast:true,
            FoodTimeLunch:false,
            FoodTimeDinner:false,
            FoodVeg:true,
            FoodEgg:false,
            FoodNonVeg:false,
            Rating:5,
            FoodType:'North Indian',
            Menu:{
                Breakfast:[
                    {name:"Poha",price:60},
                    {name:"Chole Bhature",price:50},
                    {name:"Aloo Parantha",price:40},
                    {name:"Poori Sabji",price:20},
                    {name:"Veg Sandwich",price:15},
                    {name:"Kachori",price:20},
                    {name:"Poha",price:50},
                ],
                Desserts:[
                    {name:"Jalebi",price:15},
                    {name:"Rasmalai",price:28},
                    {name:"Gulaab Jamun",price:30},
                    {name:"Faluda",price:50},
                ]
            }
        },
        {
            Name:'Madras Cafe',
            FoodTimeBreakfast:true,
            FoodTimeLunch:false,
            FoodTimeDinner:true,
            FoodVeg:true,
            FoodEgg:false,
            FoodNonVeg:false,
            Rating:4.5,
            FoodType:'South Indian',
            Menu:{
                Breakfast:[
                    {name:"Idli Sambhar",price:40},
                    {name:"Vada Sambhar",price:50},
                ],
                MainCourse:[
                    {name:"Plain Dosa",price:60},
                    {name:"Paper Dosa",price:40},
                    {name:"Masala Dosa",price:70},
                    {name:"Butter Masala Dosa",price:100},
                    {name:"Rawa Masala Dosa",price:80},
                    {name:"Onion Rawa Masala Dosa",price:110},
                ],
                Beverages:[
                    {name:"Pepsi",price:30},
                    {name:"Sprite",price:30},
                    {name:"Slice",price:30},
                    {name:"Mountain Dew",price:30},
                ]
            }
        },
        {
            Name:'Keventers',
            FoodTimeBreakfast:false,
            FoodTimeLunch:true,
            FoodTimeDinner:false,
            FoodVeg:true,
            FoodEgg:false,
            FoodNonVeg:false,
            Rating:4,
            FoodType:'Chinese',
            Menu:{
                MainCourse:[
                    {name:"Chilli Potato",price:60},
                    {name:"Honey Chilli Potato",price:70},
                    {name:"Veg Noodles",price:50},
                    {name:"Singapuri Noodles",price:70},
                    {name:"Spring Roll",price:40},
                ],
                Beverages:[
                    {name:"Pepsi",price:30},
                    {name:"Sprite",price:30},
                    {name:"Slice",price:30},
                    {name:"Mountain Dew",price:30},
                    {name:"Chocolate Shake",price:40},
                    {name:"Strawberry Shake",price:40},
                    {name:"Banana Shake",price:40},
                    {name:"Oreo Shake",price:40},
                ]
            },
        },
        {
            Name:'Fast Food Corner',
            FoodTimeBreakfast:true,
            FoodTimeLunch:true,
            FoodTimeDinner:false,
            FoodVeg:true,
            FoodEgg:true,
            FoodNonVeg:true,
            Rating:5,
            FoodType:'Fast Food',
            Menu:{
                MainCourse:[
                    {name:"Aloo Patty",price:20},
                    {name:"Paneer Patty",price:30},
                    {name:"Veg Sandwich",price:20},
                    {name:"Veg Burger",price:30},
                    {name:"Chicken Burger",price:70},
                    {name:"Mutton Burger",price:80},
                    {name:"Maggi",price:40},
                    {name:"French Fries",price:40},
                    {name:"Pasta",price:30},
                    {name:"Omellete",price:40},
                    {name:"Boiled Eggs(4 pieces)",price:30},

                ],
                Beverages:[
                    {name:"Pepsi",price:30},
                    {name:"Sprite",price:30},
                    {name:"Slice",price:30},
                    {name:"Mountain Dew",price:30},
                    {name:"Chocolate Shake",price:40},
                    {name:"Strawberry Shake",price:40},
                    {name:"Banana Shake",price:40},
                    {name:"Oreo Shake",price:40},
                ],
            }
        },
        {
            Name:'Drink Factory',
            FoodTimeBreakfast:true,
            FoodTimeLunch:true,
            FoodTimeDinner:true,
            FoodVeg:true,
            FoodEgg:false,
            FoodNonVeg:false,
            Rating:3,
            FoodType:'Beverages',
            Menu:{
                Beverages:[
                    {name:"Pepsi",price:30},
                    {name:"Sprite",price:30},
                    {name:"Slice",price:30},
                    {name:"Mountain Dew",price:30},
                    {name:"Chocolate Shake",price:40},
                    {name:"Strawberry Shake",price:40},
                    {name:"Banana Shake",price:40},
                    {name:"Oreo Shake",price:40},
                    {name:"ButterScotch Shake",price:50},
                    {name:"Badam Shake",price:50},
                    {name:"Cold Coffee",price:40},
                    {name:"Tea",price:10},
                    {name:"Hot Coffee",price:15},
                    {name:"Lemonade",price:20},
                    {name:"Virgin Mojito",price:45},
                    {name:"Coke Mojito",price:50},
                ],
            }
        },
        {
        Name:'Sweets Shop',
            FoodTimeBreakfast:true,
            FoodTimeLunch:true,
            FoodTimeDinner:false,
            FoodVeg:true,
            FoodEgg:false,
            FoodNonVeg:false,
            Rating:4.1,
            FoodType:'Desserts',
            Menu:{
                Desserts:[
                    {name:"Vanilla Ice cream",price:10},
                    {name:"Strawberry Ice cream",price:15},
                    {name:"Mango Ice cream",price:15},
                    {name:"Orange Ice cream",price:15},
                    {name:"Chocholate Ice cream",price:20},
                    {name:"Gulaab Jamun",price:30},
                    {name:"Rasmalai",price:28},
                    {name:"Faluda",price:50},
                    {name:"Rabdi",price:35},
                    {name:"Jalebi",price:10},
                    {name:"Imarti",price:15},
                ],
            }
        }
    ])
})

