const express = require('express');
const router = express.Router({ mergeParams: true });

const bcrypt = require('bcryptjs');
const auth = require('../../../../../middlewares/auth');
const findBookById = require('../../../../../middlewares/book').findBookById;
const findChapterById = require('../../../../../middlewares/book').findChapterById;
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const deleteChapterById = require('../../../utils/delete').deleteChapterById;

const Book = require('../../../../../models/Book');
const Chapter = require('../../../../../models/Chapter');
const Comment = require('../../../../../models/Comment');

// @route   GET api/books/:bookid/chapters/:chapid/comments?user=:userid&parent=:commentid
// @desc    get comments of a chapter
// @access  Public
/*
    const res = await axios.get('api/books/' + bookid + '/chapters/' + chapid + '/comments', {
        params: {
            user: userid,
            parent: commentid
        }
    });
    //  res.data = {
            comments: [Comment], // List of comments
            success: true
        }
*/
router.get('/', async (req, res) => {
    try {
        const chapter = req.params.chapid;
        const { user, parent } = req.query;
        let filter = { chapter };
        if (user) filter = { ...filter, user };
        if (parent) filter = { ...filter, parent };
        const comments = Comment.find(filter)
            .populate('user', 'username')
            .populate('chapter', 'name num');
        return res.status(200).json({ comments, success: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error when get comments', success: false });
    }
})

// @route   GET api/books/:bookid/chapters/:chapid/comments/:commentid
// @desc    get a comment by ID
// @access  Public
/*
    const res = await axios.get('api/books/' + bookid + '/chapters/' + chapid + '/comments/' + commentid);
    // res.data = {Comment, success}
*/
router.get('/:commentid', async (req, res) => {
    try {
        const chapter = req.params.chapid;
        const commentid = req.params.commentid;
        const comment = await Comment.findOne({ _id: commentid, chapter })
            .populate('user', 'username')
            .populate('chapter', 'name num');
        if (!comment) {
            return res.status(400).json({ error: "Can not find comment", success: false });
        }
        res.status(200).json({ comment, success: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error when get comment', success: false });
    }
})

// @route   POST api/books/:bookid/chapters/:chapid/comments
// @desc    post a comment to a chapter
// @access  Private
/*
    const res = await axios.post('api/books/' + bookid + '/chapters/' + chapid + '/comments', {
        content: 
    });
*/
router.post('/', auth, async (req, res) => {
    try {
        const chapter = req.params.chapid;
        
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error when post comment', success: false });
    }
})

module.exports = router;