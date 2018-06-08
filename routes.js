'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({response: 'You sent me a GET request'});
});

router.post('/', (req, res) => {
    res.json({
        response: 'You sent me a POST request',
        body: req.body
    });
});

router.get('/:qID', (req, res) => {
    res.json({
        response: 'You sent me a GET request for ID ' + req.params.qID
    });
});

router.post('/:qID/answers', (req, res) => {
    res.json({
        response: 'You sent me a POST request to /answers',
        questionID: req.params.qID,
        body: req.body
    });
});

router.put('/:qID/answers/:aID', (req, res) => {
    res.json({
        response: 'You sent me a PUT request to /answers',
        questionID: req.params.qID,
        answerID: req.params.aID,
        body: req.body
    });
});

router.delete('/:qID/answers/:aID', (req, res) => {
    res.json({
        response: 'You sent me a DELETE request to /answers',
        questionID: req.params.qID,
        answerID: req.params.aID,
    });
});

function validateVoteId(req, res, next) {
    if(req.params.dir.search(/^up|down$/) === -1) {
        const err = new Error('not Found');
        err.status = 404;
        next(err);
    } else {
        next();
    }
}

router.post('/:qID/answers/:aID/vote-:dir', validateVoteId, (req, res) => {
    res.json({
        response: 'You sent me a POST request to /vote-' + req.params.dir,
        questionID: req.params.qID,
        answerID: req.params.aID,
        vote: req.params.dir
    });
});

module.exports = router;