const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const { requireUser } = require('../../config/passport');
const validatePageInput = require('../../validations/pages');
const { singleFileUpload, singleMulterUpload } = require('../../awsS3')
const User = mongoose.model('User');
const Book = mongoose.model('Book');
const Page = mongoose.model('Page');

/* GET pages listing. */
router.get("/", async (req, res) => {
  try {
    const pages = await Page.find()
      .populate("author", "_id username")
      .sort({ createdAt: -1 });
    const Obj = {};
    pages.forEach((page) => {
      Obj[page._id] = page.toObject();
    });
    return res.json(Obj);
  } catch (err) {
    return res.json([]);
  }
});

//this is not being used at the moment 
router.get("/user/:userId", async (req, res, next) => {
  let user;
  try {
    debugger
    user = await User.findById(req.params.userId);
  } catch (err) {
    const error = new Error("User not found");
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
  try {
    const pages = await Page.find({ author: user._id })
      .sort({ createdAt: -1 })
      .populate("author", "_id username");
    res.status(200).json(pages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//we used this to fetch a particular page
  router.get("/:id", async (req, res, next) => {
    try {
      const page = await Page.findById(req.params.id).populate(
        "author",
        "_id username"
      );
      // debugger
      return res.json(page);
    } catch (err) {
      const error = new Error("Page not found");
      error.statusCode = 404;
      error.errors = { message: "No page found with that id" };
      return next(error);
    }
  });

  router.post('/', singleMulterUpload("images"), requireUser, validatePageInput, async (req, res, next) => {
    try {
      const imageUrl = await singleFileUpload({ file: req.file, public: true });
      console.log('req.body.itemGroups:', req.body.itemGroups);
      const itemGroups = JSON.parse(req.body.itemGroups);
      const formattedItemGroups = itemGroups.map(itemGroup => {
        const newGroup = {
          groupName: '',
          items: itemGroup.items.map(item => ({
            name: item.name,
            url: item.url
          }))
        }
        if (itemGroup.hasOwnProperty('groupName')) {
          newGroup.groupName = itemGroup.groupName;
        }
        return newGroup;
      });
  
      const newPage = new Page({
        author: req.user._id,
        title: req.body.title,
        description: req.body.description,
        itemGroups: formattedItemGroups,
        imageUrl: imageUrl
      });
  
      let page = await newPage.save();
      page = await page.populate("author", "_id username");
      return res.json(page);
    } catch (err) {
      next(err);
    }
  });

router.delete("/:id", requireUser, async (req, res, next) => {
  try {
    let page = await Page.findById(req.params.id);
    // if (page.author.toString() === req.user._id.toString()) 
    {
      page = await Page.deleteOne({ _id: page._id });
      return res.json(page);
    } 
    // else {
    //   const error = new Error("Page not found");
    //   error.statusCode = 404;
    //   error.errors = { message: "No user found for that page" };
    //   throw error;
    // }
  } catch (err) {
    return next(err);
  }
});

router.patch("/:id", requireUser, async (req, res, next) => {
  try {
    let page = await Page.findById(req.params.id);
    page = await Page.updateOne({ _id: page._id }, req.body);
    return res.json(page);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
