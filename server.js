const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect("mongodb+srv://abuzarbhatti46:abuzar992@client.hwwzs2g.mongodb.net/?retryWrites=true&w=majority")
  .catch((err) => console.log(err));

// DB SCHEMA AND MODEL

const postSchema = mongoose.Schema({
  title: String,
  description: String
})

const Post = mongoose.model("Post", postSchema);


app.get("/", (req, res) => {
  res.send("Express is here");
});

app.post("/create", (req, res) => {
  // console.log(req.body);
  Post.create({
    title: req.body.title,
    description: req.body.description
  })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.get("/posts", (req, res) => {
  Post.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
})

app.delete("/delete/:id", (req, res) => {
  // console.log(req.params);
  Post.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.put("/update/:id", (req, res) => {
  // console.log(req.params);
  // console.log(req.body);
  Post.findByIdAndUpdate({ _id: req.params.id }, {
    title: req.body.title,
    description: req.body.description
  }).then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.listen(3001, function () {
  console.log("Server is running")
});