const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { requireUser } = require('../../config/passport');
const validatePageInput = require('../../validations/pages');
const User = mongoose.model('User');
const Page = mongoose.model('Page');
/* GET pages listing. */

router.get('/', async (req, res) => {
  try {
    const pages = await Page.find()
                              .populate("author", "_id username")
                              .sort({ createdAt: -1 });
    return res.json(pages);
  }
  catch(err) {
    return res.json([]);
  }
});

router.get('/user/:userId', async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.userId);
  } catch(err) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
  try {
    const pages = await Page.find({ author: user._id })
                              .sort({ createdAt: -1 })
                              .populate("author", "_id username");
    return res.json(pages);
  }
  catch(err) {
    return res.json([]);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const page = await Page.findById(req.params.id)
                             .populate("author", "_id username");
    return res.json(page);
  }
  catch(err) {
    const error = new Error('Page not found');
    error.statusCode = 404;
    error.errors = { message: "No page found with that id" };
    return next(error);
  }
});

router.post('/', requireUser, validatePageInput, async (req, res, next) => {
  
  // console.log(req.user);
  try {
    const newPage = new Page({
      author: req.user._id,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl
    });

    let page = await newPage.save();
    page = await page.populate('author', '_id username');
    return res.json(page);
  }
  catch(err) {
    next(err);
  }
});

router.delete('/:id', requireUser, async (req, res, next) => {
  try {
      let page = await Page.findById(req.params.id);
      if (page.author.toString() === req.user._id.toString()) {
          page = await Page.deleteOne({_id: page._id});
          return res.json(page);  
      } else {
          const error = new Error('User does not own that spot');
          error.statusCode = 404;
          error.errors = {message: 'User doesn’t own spot'};
          throw error;
      }
  } catch(err) {
      return next(err);
  }
})

router.patch('/:id', requireUser, async (req, res, next) => {
  try {
      let page = await Page.findById(req.params.id);
      if (page.author.toString() === req.user._id.toString()){
          page = await Page.updateOne({_id: page._id}, req.body)
          return res.json(page);
      } else {
          const error = new Error('User does not own that page');
          error.statusCode = 404;
          error.errors = {message: 'User doesn’t own page'};
          throw error;
      }
  } catch(err){
      return next(err);
  }
});


module.exports = router;