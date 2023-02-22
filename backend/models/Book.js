const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
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
        type: String
    },
    pages: [{
        type: Schema.Types.ObjectId,
        ref: 'Page'
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model('Book', bookSchema)