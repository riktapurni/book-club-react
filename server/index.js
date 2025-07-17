const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
var cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
// middlewear
app.use(cors());
app.use(express.json());
//connect to mongDb database
const uri = process.env.MONGODB_URL;
console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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
    // create db and collection 
const db = client.db("book-club");
const bookCollection = db.collection("books");

//api for post
    app.post("/books", async (req, res) => {
      const newData = req.body;
      console.log("newData", newData);
      try{
const result = await bookCollection.insertOne(newData);
res.status(201).json(result)
      // console.log("added new data", result);
      // res.send(result);
      }catch(error){
        res.status(500).json({error:error.message})
      }
      
    });
    // get all books
    app.get("/books", async (req, res) => {
       try{
      const {page, limit, price, genre, author, minPrice, maxPrice, minYear, maxYear, sortBy, order, search} = req.query
      const currentPage = Math.max(1, parseInt(page) || 1)
      const perPage = parseInt(limit) || 10
      const skip = (currentPage -1) * perPage
      const filter = {}
      if (search) {
          filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } }
          ];
        }
        if(genre){
           filter.genre = genre;
          }
           if (minYear || maxYear) {
          filter.publishedYear = {
            ...(minYear && { $gte: parseInt(minYear) }),
            ...(maxYear && { $lte: parseInt(maxYear) })
          };
        }
         if (author) filter.author = { $regex: author, $options: "i" };
        if (minPrice || maxPrice) {
          filter.price = {
            ...(minPrice && { $gte: parseFloat(minPrice) }),
            ...(maxPrice && { $lte: parseFloat(maxPrice) })
          };
        }

        // Sort options
        const sortOptions = { [sortBy || 'title']: order === 'desc' ? -1 : 1 };

        // Execute queries in parallel for better performance
        const [books, totalBooks] = await Promise.all([
          bookCollection
            .find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(perPage)
            .toArray(),
          bookCollection.countDocuments(filter)
        ]);
     // const cursor = await bookCollection.find(filter);
      // const result = await cursor.toArray();
      res.status(201).json({message:"get all data succesfully", books, totalBooks,
          currentPage,
          totalPages: Math.ceil(totalBooks / perPage)});
      }catch(error){
        res.status(500).json({error:error.message})
      }
      
    });

    //to get a single data
    app.get("/books/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id) };
      const result = await bookCollection.findOne(query);
      res.send(result);
    });
    app.delete("/books/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bookCollection.deleteOne(query);
      console.log("deleting id: ", result);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//firstly testing
app.get("/", (req, res) => {
  res.send("Hello World! this is my server");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});