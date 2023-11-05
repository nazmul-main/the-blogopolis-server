
const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5001;
require('dotenv').config();


// Middleware
app.use(cors());
app.use(express.json());

const BlogDB = "my_blog_database_name";

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

    const blogCollection = client.db(BlogDB).collection("blogs");


    // phones single data
    app.post('/api/v1/blogs', async (req, res) => {
      const blog = req.body;
      const result = await blogCollection.insertOne(blog);
      console.log(result);
      res.send(result);
    });

    app.get('/api/v1/blogs', async (req, res) => {
      const result = await blogCollection.find().toArray();
      res.send(result);
    });




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


app.listen(port, () => {
  console.log(`The blogopolish server running ${port}`)
})