const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

exports.bookModel = mongoose.model("Book", bookSchema);
