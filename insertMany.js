var mongoClient = require("mongodb").MongoClient;

var users = [{name: "Bob", age: 34} , {name: "Alice", age: 21}, {name: "Tom", age: 45}];
var url = "mongodb://localhost:27017/test";
mongoClient.connect(url, function(err, db){

    db.collection("users").insertMany(users, function(err, results){

        console.log(results);
        db.close();
    });
})