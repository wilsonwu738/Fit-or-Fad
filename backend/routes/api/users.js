const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Page = mongoose.model("Page");

const passport = require("passport");
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");
const DEFAULT_PROFILE_IMAGE_URL =
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/default+profile+pic.png";
const { loginUser, restoreUser } = require("../../config/passport");
const { isProduction } = require("../../config/keys");

// const singleFileUpload = require('../../awsS3.js')
const { singleMulterUpload, singleFileUpload } = require("../../awsS3.js");
/* GET users listing. */

router.get("/", async function (req, res, next) {
  try {
    const users = await User.find({});

    const updatedUsers = {}
    users.forEach((user) => {
      const userObj = user.toObject()
      delete userObj.hashedPassword
      updatedUsers[user._id] = userObj
    })
    
    res.json(updatedUsers);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/register",
  singleMulterUpload("image"),
  validateRegisterInput,
  async (req, res, next) => {
    // Check to make sure no one has already registered with the proposed email or
    // username.
    const user = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (user) {
      // Throw a 400 error if the email address and/or email already exists
      const err = new Error("Validation Error");
      err.statusCode = 400;
      const errors = {};
      if (user.email === req.body.email) {
        errors.email = "A user has already registered with this email";
      }
      if (user.username === req.body.username) {
        errors.username = "A user has already registered with this username";
      }
      err.errors = errors;
      return next(err);
    }

    // Otherwise create a new user
    const profileImageUrl = req.file
      ? await singleFileUpload({ file: req.file, public: true })
      : DEFAULT_PROFILE_IMAGE_URL;
    const newUser = new User({
      username: req.body.username,
      profileImageUrl: profileImageUrl,
      email: req.body.email,
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
        if (err) throw err;
        try {
          newUser.hashedPassword = hashedPassword;
          const user = await newUser.save();
          // return res.json({ user });
          return res.json(await loginUser(user));
        } catch (err) {
          next(err);
        }
      });
    });
  }
);

router.post(
  "/login",
  singleMulterUpload(""),
  validateLoginInput,
  async (req, res, next) => {
    passport.authenticate("local", async function (err, user) {
      if (err) return next(err);
      if (!user) {
        const err = new Error("Invalid credentials");
        err.statusCode = 400;
        err.errors = { email: "Invalid credentials" };
        return next(err);
      }
      // return res.json({ user });
      return res.json(await loginUser(user));
    })(req, res, next);
  }
);

router.get("/current", restoreUser, (req, res) => {
  if (!isProduction) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    profileImageUrl: req.user.profileImageUrl,
    email: req.user.email,
    followers: req.user.followers,
    following: req.user.following,
    likedPage: req.user.likedPage,
    bio: req.user.bio
  });
});

router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    // delete user.hashedPassword; 
    // Remove hashedPassword property from the user object
    res.json({
      _id: user._id,
      username: user.username,
      profileImageUrl: user.profileImageUrl,
      email: user.email,
      followers: user.followers,
      following: user.following,
      likedPage: user.likedPage,
      bio: user.bio
    });
   
  } catch (err) {
    const error = new Error("User not found");
    error.statusCode = 404;
    error.errors = { message: "hi dan" };
    next(error);
  }
});

router.post("/like/:pageId", restoreUser, async (req, res, next) => {
  debugger
  try {
    const user = req.user;
    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      return next(err);
    }
    const pageId = req.params.pageId;
    // Check if the user has already liked this page
    if (user.likedPage.includes(pageId)) {
      const err = new Error("Page has already been liked");
      err.statusCode = 400;
      return next(err);
    }

    // Add the page to the user's likedPage array
    user.likedPage.push(pageId);
    await user.save();

    // Add the user to the page's liker array
    const page = await Page.findByIdAndUpdate(
      pageId,
      { $addToSet: { liker: user._id } },
      { new: true }
    ).populate(
      "author",
      "_id username"
    );

    res.json(page);
  } catch (err) {
    next(err);
  }
});

router.delete("/like/:pageId", restoreUser, async (req, res, next) => {
  debugger
  try {
    const user = req.user;
    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      return next(err);
    }
    const pageId = req.params.pageId;

    // Check if the user has already liked this page
    if (!user.likedPage.includes(pageId)) {
      const err = new Error("Page has not been liked");
      err.statusCode = 400;
      return next(err);
    }

    // Remove the page from the user's likedPage array
    // user.likedPage = user.likedPage.filter(
    //   (page) => page.toString() !== pageId
    // );
    const index = user.likedPage.indexOf(pageId);
    if (index > -1) {
      user.likedPage.splice(index, 1);
    }
    await user.save();

    // Remove the user from the page's liker array
    const page = await Page.findByIdAndUpdate(
      pageId,
      { $pull: { liker: user._id } },
      { new: true }
    ).populate(
      "author",
      "_id username"
    );

    res.json(page);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/follow/:userId", restoreUser, async function (req, res, next) {
  try {

    const userToFollow = await User.findById(req.params.userId);
    const currentUser = req.user;
    debugger;
    if (!currentUser.following.includes(userToFollow._id)) {
      // Add the user to the current user's following list
      currentUser.following.push(userToFollow._id);
      await currentUser.save();

      // Add the current user to the userToFollow's followers list
      userToFollow.followers.push(currentUser._id);
      await userToFollow.save();
    }
    res.json(userToFollow);
  } catch (err) {
    next(err);
  }
});

router.delete(
  "/unfollow/:userId",
  restoreUser,
  async function (req, res, next) {
    try {
      const userToUnfollow = await User.findById(req.params.userId);
      const currentUser = req.user;
      if (currentUser.following.includes(userToUnfollow._id)) {
        // Remove the user from the current user's following list
        currentUser.following.pull(userToUnfollow._id);
        await currentUser.save();

        // Remove the current user from the userToUnfollow's followers list
        userToUnfollow.followers.pull(currentUser._id);
        await userToUnfollow.save();
      }
      res.json(userToUnfollow);
    } catch (err) {
      next(err);
    }
  }
)

module.exports = router;
