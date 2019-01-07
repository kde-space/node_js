var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let msg = '※何か書いて送信してください。'
  if (req.session.message !== undefined) {
    msg = `Last message: ${req.session.message}`;
  }
  const data = {
    title: 'Hello',
    content: msg
  };
  res.render('hello', data);
});

router.post('/post', (req, res, next) => {
  const message = req.body.message;
  req.session.message = message;
  const data = {
    title: 'Hello',
    content: `Last message: ${req.session.message}`
  };
  res.render('hello', data);
});

router.get('/hoge', function(req, res, next) {
  const data = {
    title: 'Hello hoge',
    content: 'これはhello/hoge ページです<br>This is hello/hoge content.'
  };
  res.render('hello', data);
});


module.exports = router;
