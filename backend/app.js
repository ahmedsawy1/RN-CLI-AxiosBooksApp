const express = require("express");
const mongoose = require("mongoose");
const app = express();

const booksRouter = require("./routes/books");

app.use(express.json());
app.use("/books", booksRouter);

mongoose
  .connect(
    "mongodb+srv://ahmed:a123456789@cluster0.f0bzw.mongodb.net/axiosBooksApp?retryWrites=true&w=majority",
    {
      dbName: "axiosBooksApp",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(console.log("Connected"))
  .catch((err) => console.log(err));

app.listen("3000", console.log("listned"));
