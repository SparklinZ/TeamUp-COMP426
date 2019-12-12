import express from "express";
import {parseGet} from "../middlewares/parse_get";
import {parsePost} from "../middlewares/parse_post";
import {parseDelete} from "../middlewares/parse_delete";
import {authenticateUser} from "../middlewares/auth";

export const router = express.Router();
export const prefix = '/private';

const {privateStore} = require('../data/DataStore');

/**
 * Every request to this route needs
 * to be made from an authenticated user.
 */
router.use(authenticateUser);


router.get('/*', parseGet, function (req, res) {
  const result = req.handleGet(privateStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});


router.post('/*', parsePost, function (req, res) {
  const result = req.handlePost(privateStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});


router.delete('/*', parseDelete, function (req, res) {
  const result = req.handleDelete(privateStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});


/*
router.get('/*', function (req, res) {
  let response;
  if (typeof req.query.username != 'undefined'){
    response = privateStore.filter(function(ele){
      if(ele.username === req.query.username){
        return ele;
      }
    });
  } else {
    response = req.handleGet(privateStore);
  }

  res.json(response); 
});
*/