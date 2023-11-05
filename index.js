
const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = 5001
require('dotenv').config();

/* DB URI */
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.idkvt6k.mongodb.net/?retryWrites=true&w=majority`;

/* Mongodb connection */
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});




async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/api/v1/allblogs',(req, res) => {
  res.send('konodatainai')
})

app.listen(port, () => {
  console.log(`The blogopolish server running ${port}`)
})