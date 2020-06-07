const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cors());

mongoose.connect("mongodb://localhost:27017/harryDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const customerSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Customer = mongoose.model("Customer", customerSchema);

// const customer = new Customer({
//   name: "harita",
//   age: 8
// });

// customer.save();

app.get("/Test", function(req, res) {
  Customer.find({}, function(err, customers){
    res.send(
      JSON.stringify(customers)
  );
  });

});

// app.get('*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/client/public/index.html'));
// });

// app.post("/compose", function(req, res) {
//   const post = new Post ({

//    name: "harita",

//    age: 4

//  });
//   post.save(function(err){
//     if(!err){
//       res.redirect("/");
//     }
//   });

// });

app.listen(3001, function() {
  console.log("Server started on port 3001");
});