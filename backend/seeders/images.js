const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys.js");
const User = require("../models/User");
const Page = require("../models/Page");

const DEFAULT_PROFILE_IMAGE_URL =
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/default+profile+pic.png";

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    initializeImages();
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });

const initializeImages = async () => {
  await User.updateMany({}, { profileImageUrl: DEFAULT_PROFILE_IMAGE_URL });

  // await Post.updateMany({}, { imageUrls: [] });

  mongoose.disconnect();
};
