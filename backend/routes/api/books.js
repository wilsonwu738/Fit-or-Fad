const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Book = mongoose.model("Book");
const User = mongoose.model("User");
const { requireUser } = require("../../config/passport");
const validateBookInput = require("../../validations/books");

router.get("/", async (req, res) => {
  try {
    const books = await Book.find()
      .populate("author", "_id username")
      .sort({ createdAt: -1 });
    return res.json(books);
  } catch (err) {
    return res.json([]);
  }
});

router.get("/user/:userId", async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.userId);
  } catch (err) {
    const error = new Error("User not found");
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
  try {
    const books = await Book.find({ author: user._id })
      .sort({ createdAt: -1 })
      .populate("author", "_id username");
    return res.json(books);
  } catch (err) {
    return res.json([]);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "author",
      "_id username"
    );
    return res.json(book);
  } catch (err) {
    const error = new Error("Book not found");
    error.statusCode = 404;
    error.errors = { message: "No book is found with that id" };
    return next(error);
  }
});

router.post("/", requireUser, validateBookInput, async (req, res, next) => {
  try {
    const newBook = new Book({
      author: req.user._id,
      title: req.body.title,
      description: req.body.description,
    });

    let book = await newBook.save();
    book = await book.populate("author", "_id username");
    return res.json(book);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireUser, async (req, res, next) => {
  try {
    let book = await Book.findById(req.params.id);
    if (book.author.toString() === req.user._id.toString()) {
      book = await Book.deleteOne({ _id: book._id });
      return res.json(book);
    } else {
      const error = new Error("Book not found");
      error.statusCode = 404;
      error.errors = { message: "No user found for that book" };
      throw error;
    }
  } catch (err) {
    return next(err);
  }
});

router.patch("/:id", requireUser, async (req, res, next) => {
  try {
    let book = await Book.findById(req.params.id);
    if (book.author.toString() === req.user._id.toString()) {
      book = await Book.updateOne({ _id: book._id }, req.body);
      return res.json(book);
    } else {
      const error = new Error("Book not found");
      error.statusCode = 404;
      error.errors = { message: "No user found for that book" };
      throw error;
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
