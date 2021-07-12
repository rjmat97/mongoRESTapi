const {MongoClient} = require('mongodb')

module.exports.main = async function (){
    const uri = "mongodb://127.0.0.1:27017"
    const client = new MongoClient(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
    try{
        await client.connect()
        // return await showDBs(client)
        // return await find(client)
        // return await find(client, "A2a")
        return await aggregate(client)
    } catch(e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

async function aggregate(client){
    const ob = [
        {$project: {_id: "$accession", variant:"$clade", date: "$date"}},
        {$group:   {_id: {date:"$date",variant:"$variant"}, count:{$sum:1}}}
    ]
    return await client.db("gear19").collection("states").aggregate(ob).toArray()
}
// async function showDBs(client){
//     databasesList = await client.db().admin().listDatabases()
//     // let retStr = {}
//     // databasesList.databases.forEach(db => retStr = retStr + ` - ${db.name}\n`)
//     return databasesList.databases.map(db => db.name)  
// };

// async function insertOne(client, newListing){
//     // const drop   = await client.db("gear19").collection("states").drop()
//     const result = await client.db("gear19").collection("states").insertOne(newListing)
// }

// async function insertMany(client, newListing){
//     const result = await client.db("gear19").collection("states").insertMany(newListing)
// }

async function findOne(client, search){
    const result = await client.db("gear19").collection("states").findOne({clade: search})
    if (result) return result
    else return 0
}

// async function find(client){
//     const result = await client.db("gear19").collection("states").find({clade: "A2a"})
//     console.log(result)
//     if(result){
//         return result
//     } else {
//         return 0
//     }
// }
