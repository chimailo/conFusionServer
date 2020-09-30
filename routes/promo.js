const express = require('express');
const Promotion = require('../models/promotions');
var authenticate = require('../authenticate');

const promoRouter = express.Router();

promoRouter
  .route('/')
  .get((req, res, next) => {
    Promotion.find({})
      .then(
        (promo) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(promo);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    Promotion.create(req.body)
      .then(
        (promo) => {
          console.log('Promotion Created ', promo);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(promo);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promo');
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Promotion.remove({})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

promoRouter
  .route('/:promoId')
  .get((req, res, next) => {
    Promotion.findById(req.params.promoId)
      .then(
        (promo) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(promo);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promo/' + req.params.promoId);
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    Promotion.findByIdAndUpdate(
      req.params.promoId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (promo) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(promo);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Promotion.findByIdAndRemove(req.params.promoId)
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = promoRouter;
