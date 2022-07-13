const express = require('express');
const Model = require('../models/model');
const router = express.Router();

const { MongoClient } = require('mongodb');
const { find } = require('../models/model');
const client = new MongoClient('mongodb://127.0.0.1')

async function run(callback, filters={}) {
    try {
        await client.connect();
        return await callback(filters)
    } catch {
        console.log('⚠️ an error occured')
    }finally { 
        await client.close(); 
    }
}

async function findAll(filters={}){
    return await client.db("wastewater").collection("viralLoad").find(filters).toArray()
}

function parseQuery(q){
    let qo = {}
    let keys = Object.keys(q)
    let vals = Object.values(q)

    vals.forEach((d, i) => {
        if(d.split(':').length>1){
            let ar = d.split(':')
            let re = {}
            re[`$${ar[0]}`] = parseFloat(ar[1])
            qo[keys[i]] = re
        }else{
            qo[keys[i]] = d
        }
    }) 
    return qo
}

router.post('/post', async (req, res) => {
    console.log(req.body)
    res.send(`abbr : ${req.body.abbr}`)
    res.end();
})


//Get all Method
router.get('/getAll', async (req, res) => {
    console.log(req.query)
    let params = parseQuery(req.query)
    console.log(params)
    let ret = await run(findAll, params)
    res.send(ret)
    res.end();
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;