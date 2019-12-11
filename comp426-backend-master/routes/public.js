import express from "express";
import {parseGet} from "../middlewares/parse_get";
import {parsePost} from "../middlewares/parse_post";
import {parseDelete} from "../middlewares/parse_delete";

export const router = express.Router();
export const prefix = '/public';

const {publicStore} = require('../data/DataStore');

/*
// post sth to the wall
router.post('/wallposts', async function (req, res) {
  const body = req.body.body;
  publicStore.set(`posts.${id}`, {
    data: { text: body,
      date: Date.now(),
       }
  });
  res.send({post: publicStore.get(`posts.${id++}`), status: 'Successfully posted'});
});

// get posts for rendering the wall - currently all of them, might limit/ filter to 50
router.get('/wallposts', async function (req, res) {
  res.send({posts: publicStore.get(`posts`)});
});

*/

router.get('/*', parseGet, function (req, res) {
  const result = req.handleGet(publicStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});

router.post('/*', parsePost, function (req, res) {
  const result = req.handlePost(publicStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});

router.delete('/*', parseDelete, function (req, res) {
  const result = req.handleDelete(publicStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});
