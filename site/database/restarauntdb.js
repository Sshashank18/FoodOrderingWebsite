const {MongoClient}=require('mongodb');

const url='mongodb://localhost:27017';


const connectdb=(dbName)=>{
    return MongoClient.connect(url,{ useNewUrlParser: true }).then(client=>client.db(dbName))
}

const getAllRestaraunts= () =>{
    return connectdb("RestarauntsList")
    .then(db=>db.collection('restaraunts').find())
    .then(b=>b.toArray());
}

module.exports={
    getAllRestaraunts,
    connectdb
}