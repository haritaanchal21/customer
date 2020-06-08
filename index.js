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
  customerId: Number,
  name: String,
  age: Number,
  gender: String,
  address: String
});

const Customer = mongoose.model("Customer", customerSchema);


app.get("/Test", function(req, res) {
  Customer.find({}, function(err, customers){
     res.send({  express: customers });
  });

});



app.listen(3001, function() {
  console.log("Server started on port 3001");
});