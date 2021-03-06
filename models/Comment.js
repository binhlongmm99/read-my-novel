const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    chapter: {
        type: Schema.Types.ObjectId, 
        ref: 'chapter',
        required: true
    },
    parent: {
        type:Schema.Types.ObjectId,
        ref: 'comment'
    },
    content: {
        type: String,
        required: true
    },
    upvote: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'user' 
        }],
        default: []
    },
    downvote: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'user' 
        }],
        default: []
    }
}, {timestamps: true}); // timestamps add {createdAt: Date, updatedAt: Date}

module.exports = Comment = mongoose.model('comment', CommentSchema, 'comment');