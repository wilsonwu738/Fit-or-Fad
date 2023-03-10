const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const itemGroupSchema = new Schema({
//   groupName: {
//     type: String
//   },
//   items: [{
//     name: String,
//     url: String
//   }]
// });
const pageSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  liker: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  items: [{
    name: String,
    url: String
  }]
}, { 
  timestamps: true 
});
module.exports = mongoose.model('Page', pageSchema);
