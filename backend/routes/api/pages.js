const express = require("express");
const router = express.Router();

const mongoose = require('mongoose');
const { requireUser, restoreUser } = require('../../config/passport');
const validatePageInput = require('../../validations/pages');
const { singleFileUpload, singleMulterUpload } = require('../../awsS3')
const User = mongoose.model('User');
const Book = mongoose.model('Book');
const Page = mongoose.model('Page');
const Comment = mongoose.model('Comment');

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


router.get("/comments", async function (req, res, next) {
  try {
    const comments = await Comment.find({}).populate({path: 'commenter',
    select: "_id username"
    });
    const Obj = {};
    comments.forEach((comment) => {
      Obj[comment._id] = comment.toObject();
    });
    res.json(Obj);
  } catch (err) {
    next(err);
  }
});

//we used this to fetch a particular page
router.get("/:id", async (req, res, next) => {
  try {
    const page = await Page.findById(req.params.id).populate(
      "author",
      "_id username"
    );
    return res.json(page);
  } catch (err) {
    const error = new Error("Page not found");
    error.statusCode = 404;
    error.errors = { message: "No page found with that id" };
    return next(error);
  }
});

router.post(
  "/",
  singleMulterUpload("images"),
  requireUser,
  validatePageInput,
  async (req, res, next) => {
    try {
      const imageUrl = await singleFileUpload({ file: req.file, public: true });

      const items = JSON.parse(req.body.items);
      const formattedItems = items.map((item) => ({  
        name: item.name,
        url: item.url
      }));
      
      const newPage = new Page({
        author: req.user._id,
        title: req.body.title,
        description: req.body.description,

        items: formattedItems,
        imageUrl: imageUrl
      });
      
      let page = await newPage.save();
      page = await page.populate("author", "_id username");
      return res.json(page);
    } catch (err) {
      next(err);
    }
  }
);



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


router.post('/comments/:pageId', requireUser, async (req, res, next) => {
  try {
    const { text } = req.body;
    const pageId = req.params.pageId;
    const userId = req.user._id;

    // Create a new comment object with the given text, commenter, and page
    const comment = new Comment({
      text: text,
      commenter: userId,
      page: pageId
    });

    // Save the comment to the database
    await comment.save();
    comment.populate({path: 'commenter', select: '_id username'})

    // Add the comment to the page's comments array
    const page = await Page.findByIdAndUpdate(
      pageId,
      { $push: { comments: comment._id } },
      { new: true }
    );

    res.json({[comment._id]: comment});
  } catch (err) {
    next(err);
  }
});

router.delete('/comments/:commentId', requireUser, async (req, res, next) => {
  try {
    let comment = await Comment.findById(req.params.commentId);
    // if (page.author.toString() === req.user._id.toString()) 
    // {
    

    const pageId = comment.page
    const page = await Page.findByIdAndUpdate(
      pageId,
      { $pull: { comments: comment._id } },
      { new: true }
    );

    comment = await Comment.deleteOne({ _id: comment._id });
    res.json("Deleted!");
    // } 
    // else {
    //   const error = new Error("Page not found");
    //   error.statusCode = 404;
    //   error.errors = { message: "No user found for that page" };
    //   throw error;
    // }
  } catch (err) {
    next(err);
  }
});


router.patch("/comments/:commentId", requireUser, async (req, res, next) => {
  try {
    let comment = await Comment.findById(req.params.commentId);
  
    let status = await Comment.updateOne({ _id: comment._id }, req.body);

    // to pull the updated comment and for res
    comment = await Comment.findById(req.params.commentId).populate({path: 'commenter', select: '_id username'})
    res.json({[comment._id]: comment});
  } catch (err) {
    return next(err);
  }
});







// router.post('/:id/like', async (req, res) => {
//   try {
//     const page = await Page.findById(req.params.id);

//     if (!page) {
//       return res.status(404).json({ message: 'Page not found' });
//     }

//     const user = req.user;
//     if (page.liker.includes(user._id)) {
//       return res.status(400).json({ message: 'You have already liked this page' });
//     }

//     page.liker.push(user._id);
//     await page.save();

//     res.json({ message: 'Page liked successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// router.delete('/:id/like', async (req, res) => {
//   try {
//     const page = await Page.findById(req.params.id);

//     if (!page) {
//       return res.status(404).json({ message: 'Page not found' });
//     }

//     const user = req.user; // assume user is authenticated and their document is stored in req.user
//     const index = page.liker.indexOf(user._id);
//     if (index === -1) {
//       return res.status(400).json({ message: 'You have not liked this page yet' });
//     }

//     page.liker.splice(index, 1);
//     await page.save();

//     res.json({ message: 'Page like removed successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

module.exports = router;
