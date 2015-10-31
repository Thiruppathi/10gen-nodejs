var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
  if (err) throw err;

  var data = db.collection('data');

  var sort = {
    'State': 1,
    'Temperature': -1
  };
  var operator = {'$set': {'month_high': true} };
  var options = {
    'new': true
  };
  var state = "";
  // db.data.update({"_id": ObjectId("562d54d9a6f62b80bdd177ab")}, {'$set': {'month_high': true} });
  // db.data.update({"_id": ObjectId("562d54d9a6f62b80bdd17a48")}, {'$set': {'month_high': true} });
  // db.data.update({"_id": ObjectId("562d54d9a6f62b80bdd17d71")}, {'$set': {'month_high': true} });
  // db.data.update({"_id": ObjectId("562d54d9a6f62b80bdd175e8")}, {'$set': {'month_high': true} });
  // db.data.remove({"_id": ObjectId("562cfe8b0e706453e472b3cc")});

db.data.find({'month_high': true}).pretty()
  data.find({}).sort(sort).each(dbCallBack);

  function dbCallBack(err, doc) {
    if (err) throw err;

    if (!doc) {
      console.dir("No document found");
      return db.close();
    }

    if (state !== doc.State) {
      state = doc.State;
      var id = doc._id;
      if (state) {
        console.log('New State: ' + state + ' _id:' + id + " Temperature: "+ doc.Temperature);
      }
    }
    //console.log(JSON.stringify(doc));

  }


});
