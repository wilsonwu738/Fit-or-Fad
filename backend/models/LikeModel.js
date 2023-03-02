const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  liker: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  page: {
    type: Schema.Types.ObjectId,
    ref: 'Page',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Like', likeSchema);