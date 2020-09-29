const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end(`Will send the leader with id ${req.params.leaderId} to you!`);
})
.post((req, res, next) => {
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
    res.end('Deleting all leaders');
});

promoRouter.route('/:leaderId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end(`Will send the leader with id ${req.params.leaderId} to you!`);
})
.put((req, res, next) => {
    res.end(`Will update the leader with id ${req.params.leaderId} with: ${req.body.name} with details: ${req.body.description}`);
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/leaderId');
})
.delete((req, res, next) => {
    res.end(`Deleting the leader with id ${req.params.leaderId}`);
});

module.exports = promoRouter;