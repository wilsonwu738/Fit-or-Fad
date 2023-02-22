const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
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
        // required: true
    },

    liker: [{type: Schema.Types.ObjectId, ref: 'User'}]

    }, { 
    timestamps: true 
    });

module.exports = mongoose.model('Page', pageSchema);