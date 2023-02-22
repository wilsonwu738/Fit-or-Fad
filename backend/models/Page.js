const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String
  },
  url: {
    type: String
  }
});

const itemGroupSchema = new Schema({
  groupName: {
    type: String
  },
  items: [itemSchema]
});

const pageSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
//   book: {
//     type: Schema.Types.ObjectId,
//     ref: 'Book'
//   },
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
    // required: true
  },
  likes: [{type: Schema.Types.ObjectId, ref: 'Like'}],
  itemGroups: [itemGroupSchema]
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Page', pageSchema);