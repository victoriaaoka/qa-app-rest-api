'use strict';

const express = require('express');
const router = express.Router();
const Question = require('../models/models').Question;

// Trigger the 'get a specific question handler' 
//whenever the 'qId' parameter is present in the url.
router.param('qId', (req, res, next,id) => {
    Question.findById(id, (err, doc) => {
        if(err) return next(err);
        if(!doc){
            err = new Error('Not Found!');
            err.status = 404;
            return next(err);
        }
        req.question = doc;
        next();
    });
});

// Trigger the 'get a specific answer handler' 
//whenever the 'aId' parameter is present in the url.
router.param('aId', (req, res, next,id) => {
    req.answer = req.question.answers.id(id);
    if(!req.answer){
        const err = new Error('Not Found!');
        err.status = 404;
        return next(err);
    }
    next();
});

//GET /questions
//Return all the questions
router.get('/', (req, res, next) => {
    Question.find({})
        .sort({createdAt: -1})
        .exec ((err, questions) => {
            if(err) return next(err);
            res.json(questions);
         });
});

//POST /questions
// Add questions
router.post('/', (req, res, next) => {
    const question = new Question(req.body);
    question.save((err, question) => {
        if(err) return next(err);
        res.status = 201;
        res.json(question);
    });
});

//GET /questions/:qId
//Return specific questions using the ID
router.get('/:qId', (req, res, next) => {
    res.json(req.question);
});

//POST /questions/:qId/answers
// Add answers
router.post('/:qId/answers', (req, res, next) => {
    req.question.answers.push(req.body);
    req.question.save((err, question) => {
        if(err) return next(err);
        res.status = 201;
        res.json(question);
    });
});

//PUT /questions/:qId/answers/:aId
// Edit a specific answer based on answerId
router.put('/:qId/answers/:aId', (req, res) => {
    req.answer.update(req.body, (err, result) =>{
        if(err) return next(err);
        res.json(result);
    });
});


//DELETE /questions/:qId/answers/:aId
// Delete a specific answer based on answerId
router.delete('/:qId/answers/:aId', (req, res) => {
	req.answer.remove( err => {
		req.question.save((err, question) => {
			if(err) return next(err);
			res.json(question);
		});
	});
});

//POST /questions/:qId/answers/:aId/vote-up
//POST /questions/:qId/answers/:aId/vote-down
// Upvote/Downvote a specific answer based on answerId
router.post('/:qId/answers/:aId/vote-:dir',
	(req, res, next) => {
		if(req.params.dir.search(/^(up|down)$/) === -1) {
			const err = new Error("Not Found");
			err.status = 404;
			return next(err);
		} else {
			req.vote = req.params.dir;
			next();
		}
	}, 
	(req, res, next) => {
		req.answer.vote(req.vote, (err, question) => {
			if(err) return next(err);
			res.json(question);
		});
});

module.exports = router;