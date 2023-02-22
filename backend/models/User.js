const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    bio: {
      type: String
    },
    profileImageUrl: {
      type: String 
    },
    hashedPassword: {
      type: String,
      required: true
    },
    likedPage: [{ type: Schema.Types.ObjectId, ref: 'Page'}],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    following: [{ type: Schema.Types.ObjectId, ref: 'User'}]
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('User', userSchema);