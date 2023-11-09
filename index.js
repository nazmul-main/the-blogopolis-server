
const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5001;
require('dotenv').config();


// Middleware
app.use(
  cors({
      origin: ['http://localhost:5173', 'https://the-blogopolis.web.app'],
     
  }),
)
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
    const commentCollection = client.db(BlogDB).collection("comments");
    const wishlistCollection = client.db(BlogDB).collection("wishlists");


    // blog single data
    app.post('/api/v1/blogs', async (req, res) => {
      const blog = req.body;
      const result = await blogCollection.insertOne(blog);
      console.log(result);
      res.send(result);
    });
    


    app.get('/api/v1/blogs', async (req, res) => {
      const cursor = blogCollection.find()
      const result = await  cursor.toArray()
      res.send(result);
    });
    
    /* get for ubpadteed */
    app.get('/api/v1/update/blogs/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await blogCollection.findOne(query);
      res.send(result);
      
    });


    // comment data post
    app.post('/api/v1/user/comment', async (req, res) => {
     const comment = (req.body);
     const result = await commentCollection.insertOne(comment)
     console.log(result);
     res.send(result);
    })

    app.get('/api/v1/user/comment', async (req, res) => {
      const cursor = commentCollection.find()
      const result = await  cursor.toArray()
      res.send(result);
    });



    /* wishList data post */
    app.post('/api/v1/user/wishlist' , async (req, res) => {
      const wishlist = (req.body);
      console.log(wishlist);
     const result = await wishlistCollection.insertOne(wishlist)
     console.log(result);
     res.send(result);
    });

    app.get('/api/v1/user/wishlist', async (req, res) => {
      let query = {};
      if (req.query?.email){
        query = {email: req.query.email}
      }
      const cursor = wishlistCollection.find(query)
      const result = await  cursor.toArray()
      res.send(result);
    });

    // app.get('api/v1//wishlist/details', async (req, res) => {
    //   const cursor = wishlistCollection.find()
    //   const result = await  cursor.toArray()
    //   res.send(result);
    // })

    /* Delete */
    app.delete('/api/v1/user/wishlist/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) };
      const result = await wishlistCollection.deleteOne(query);
      res.send(result);
    })

    // update data
    app.put('/api/v1/blogs/update/:id', async (req, res) => {
      const id = req.params.id;
      const update = req.body
      console.log(id, update);
      const filter = { _id: new ObjectId(id) }
      const option = { upsert: true }
      const updatedBlog = {
        $set: {
          title: update.title,
          img: update.img,
          category: update.category,
          short_description: update.short_description,
          long_description: update.long_description,
          currentTime: update.currentTime
        }
      }

      const result = await blogCollection.updateOne(filter, updatedBlog, option);
      res.send(result);
      console.log(result);
    })



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