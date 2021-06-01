const { bookModel } = require("../model/book");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  let newBook = new bookModel({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
  });
  newBook = await newBook.save();

  if (!newBook) return res.status(400).send("the book cannot be created!");
  res.send(newBook);
});

router.get("/", async (req, res) => {
  const books = await bookModel.find();
  if (!books) {
    res.status(500).json({ success: false });
  }
  res.send(books);
});

router.get("/:id", async (req, res) => {
  const books = await bookModel.findById(req.params.id);
  if (!books) {
    res.status(500).json({ success: false });
  }
  res.send(books);
});

router.delete("/:id", async (req, res) => {
  await bookModel.findByIdAndRemove(req.params.id);
  res.send("the book is deleted");
});

router.put("/:id", async (req, res) => {
  const updatedBook = await bookModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
    },
    { new: true }
  );

  res.send(updatedBook);
});

module.exports = router;
