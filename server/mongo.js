const {MongoClient} = require('mongodb')

module.exports.main = async function (){
    const uri = "mongodb://127.0.0.1:27017"
    const client = new MongoClient(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
    try{
        await client.connect()
        return await showDBs(client)
        // return await find(client)
        // findOne(client, "A2a")
        // return "hello there"
    } catch(e) {
        console.error(e)
    } finally {
        await client.close()
    }
}
async function showDBs(client){
    databasesList = await client.db().admin().listDatabases()
    // let retStr = {}
    // databasesList.databases.forEach(db => retStr = retStr + ` - ${db.name}\n`)
    return databasesList.databases.map(db => db.name)  
};

async function insertOne(client, newListing){
    // const drop   = await client.db("gear19").collection("states").drop()
    const result = await client.db("gear19").collection("states").insertOne(newListing)
}

async function insertMany(client, newListing){
    const result = await client.db("gear19").collection("states").insertMany(newListing)
}

async function findOne(client, search){
    const result = await client.db("gear19").collection("states").findOne({clade: search})
    if (result) {
        console.log(`Found a listing in the collection with the name '${search}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${search}'`);
    }
}

async function find(client){
    const result = await client.db("gear19").collection("states").find({clade: "A2a"})
    console.log(result)
    if(result){
        return result
    } else {
        return 0
    }
}
