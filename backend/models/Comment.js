const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  commenter: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  page: {
    type: Schema.Types.ObjectId,
    ref: 'Page',
    required: true
  },
  text: { 
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);