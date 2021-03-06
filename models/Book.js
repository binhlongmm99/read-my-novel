const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    cover: {
        type: String
    },
    banner: {
        type: String
    },
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'genre'
    }],
    sypnosis: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    ratings: {
        type: Number,
        default: 0
    },
    votes: {
        type: Number,
        default: 0
    },
    collections: {
        type: Number,
        default: 0
    }
}, {timestamps: true});// timestamps add {createdAt: Date, updatedAt: Date}

module.exports = Book = mongoose.model('book', BookSchema, 'book');