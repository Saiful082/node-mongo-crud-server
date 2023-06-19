const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId,  } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


// User: dbuser2
// Password: NErcJGfhclFFtFTg


const uri = "mongodb+srv://dbuser2:NErcJGfhclFFtFTg@cluster0.m92agsd.mongodb.net/?retryWrites=true&w=majority";

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

    const userCollection = client.db('nodeMongoCrud').collection('user');
   
    app.get('/users', async(req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

   app.get('/users/:id', async(req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id)};
    const user = await userCollection.findOne(query);
    res.send(user);

   })

    app.post('/users', async(req, res) => {
      const user = req.body;
      console.log(user);
      const result = await userCollection.insertOne(user)
      res.send(result);
    });

    app.put('/users/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const user = req.body;
      const option = {upsert: true};
      const updateUser = {
        $set: {
          name: user.name,
          email: user.email,
          addrress: user.address,
          
        }

      }
      const result = await userCollection.updateOne(filter, updateUser, option);
      res.send(result);
     
    })


    app.delete('/users/:id', async(req, res)  =>{
      const id = req.params.id;
      // console.log('trying to delete', id);
      const query = {_id: new  ObjectId (id) }
      const result = await userCollection.deleteOne(query);
      console.log(result);
      res.send(result); 
    })
  } 
  finally {
    
  }
}
run().catch(error => console.log(error));


// const uri = "mongodb+srv://saifulislam082:yKri1jsjHN8SS3Bc@cluster0.m92agsd.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,

//   }
// });
// async function run() {
//   try {
//      const userCollection = client.db('nodeMongoCrud').collection('user');
//      const user = {
//       name: 'mahi',
//       email: 'mahi@gmail.com'
//      }
//      const result = await userCollection.insertOne(user);
//      console.log(result);
//     }
// finally{

// }

//   } 


// run().catch( error => console.log(error));




app.get('/', (req, res) =>{
    res.send('Hello from node mongo crud server');
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})