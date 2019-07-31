const {MongoClient}=require('mongodb');

const url='mongodb://localhost:27017';

const dbName="RestarauntsList";

module.exports.connectdb=(dbName)=>{
    return MongoClient.connect(url).then(client=>client.db(dbName))
}