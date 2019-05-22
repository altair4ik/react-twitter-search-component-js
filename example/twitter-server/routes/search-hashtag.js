const express = require('express')
const router = express.Router()
const Twitter = require('twitter-node-client').Twitter
const config = require('../data/twitter_config')
const twitter = new Twitter(config)

router.post('/search', function (req, res, next) {
  console.log('req', req.body.data)
  let error = function (err, response, body) {
    res.json({msg: 'error', data: err})
  }
  let success = function (data) {
    res.json({msg: 'success', data: data})
  }
  twitter.getSearch({'q': req.body.data, 'count': 10, 'tweet_mode': 'extended'}, error, success)
})

module.exports = router
