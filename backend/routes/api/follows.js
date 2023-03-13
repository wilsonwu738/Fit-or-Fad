const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { requireUser } = require("../../config/passport");
const validatePageInput = require("../../validations/pages");
const Follow = mongoose.model("Follow");
const User = mongoose.model("User");

//still need validations

router.post("/users/:id/follow", async (req, res, next) => {
  try {
    const userToFollow = await User.findById(req.params.id);

    if (!userToFollow) {
      return res.status(404).json({ error: "User not found" });
    }

    const follow = new Follow({
      follower: req.user._id,
      following: req.params.id,
    });

    await follow.save();
    res.status(201).json(follow);
  } catch (error) {
    next(error);
  }
});

router.delete("/users/:id/unfollow", async (req, res, next) => {
  try {
    const follow = await Follow.findOneAndDelete({
      follower: req.user._id,
      following: req.params.id,
    });

    if (!follow) {
      return res.status(404).json({ error: "Follow not found" });
    }

    res.json(follow);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
