const express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const app = express()
var db = null;

app.use(express.static('static'))
app.use(bodyParser.json({type: '*/*'}))

app.get('/', function (req, res) {
  res.send('Hello World!')
})


var bugData = [
  {id: 1, priority: 'P1', status: 'Open', owner: 'Ravan', title: 'App crashes on open'},
  {id: 2, priority: 'P2', status: 'New', owner: 'Eddie', title: 'Misaligned border on panel'},
];

app.get('/api/bugs', function (req, res) {
  var filter = {};
  if (req.query.priority)
    filter.priority = req.query.priority;
  if (req.query.status)
    filter.status = req.query.status;

  db.collection("bugs").find(filter).toArray(function (err, docs) {
    res.json(docs);
  })
});

app.post('/api/bugs', function (req, res) {
  var newBug = req.body;
  db.collection('bugs').insertOne(newBug, function (err, result) {
    var newId = result.insertedId;
    db.collection("bugs").find({_id: newId}).next(function (err, doc) {
      res.json(doc);
    });
  });
});


MongoClient.connect('mongodb://localhost:27017/bugsdb', function (err, dbConnection) {
  db = dbConnection;
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })

});
