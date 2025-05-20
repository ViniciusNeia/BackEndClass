import { MongoClient } from 'mongodb';
const client = new MongoClient('mongodb://localhost:27017')

async function connect() {
    try{
        await client.connect();
        return client.db('BackEndProject')
    } catch(err){
        throw err;
    }
}

export{connect}