const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');

const DEFAULT_PROFILE_IMAGE_URL = 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/default+profile+pic.png'; 


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    initializeImages();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });


const initializeImages = async () => {
  console.log("Initializing profile avatars...");
  await User.updateMany({}, { profileImageUrl: DEFAULT_PROFILE_IMAGE_URL });
    
  // console.log("Initializing Post image URLs...");
  // await Post.updateMany({}, { imageUrls: [] });

  console.log("Done!");
  mongoose.disconnect();
}