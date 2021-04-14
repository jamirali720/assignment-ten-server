
const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.grxko.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {

      const  collection = client.db("onlineBookSeller").collection("bookSeller");  
      const  buyerCollection = client.db("onlineBookSeller").collection("buyerInfo");  

      app.post('/buyerInfo', (req, res) => {
              const buyerInfo = req.body;
            console.log(buyerInfo)  
            buyerCollection.insertOne(buyerInfo)
              .then(function(result) {
                console.log(result);
              })
              
              .catch((err) => {
                
                console.log( 'error', err)
              })         
      })

      app.post('/addBook', (req, res) => {
              const newBook = req.body;
            console.log(newBook)  
              collection.insertOne(newBook)
              .then(function(result) {
                console.log(result);
              })
              
              .catch((err) => {
                
                console.log( 'error', err)
              })         
      })

     

      app.get('/getBook', (req, res) => {
        collection.find({})
        .toArray((err, documents) => {
          res.send(documents)
        })
        
      })
      
      app.get('/getAllBooks', (req, res) => {
        collection.find({})
        .toArray((err, documents) => {
          res.send(documents)
        })
        
      })
      app.get('/getBuyerInfo', (req, res) => {
        
        buyerCollection.find({email: (req.query.email)})
        .toArray((err, documents) => {
          res.send(documents)
        })        
      })

      app.get('/getBooks/:id', (req, res) => {
        collection.find({_id: ObjectId (req.params.id)})
        .toArray((err, documents) => {
          res.send(documents)
        })        
      })
  
      app.delete('/deleteItem/:id', (req, res) => {
        collection.deleteOne({_id: ObjectId (req.params.id)})
          .then( result => {
            res.send(result.deletedCount > 0);
          })
        
      })
    

  

})



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
app.listen(8080)
