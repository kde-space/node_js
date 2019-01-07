var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const msg = '※何か書いて送信してください。'
  const data = {
    title: 'Hello',
    content: msg
  };
  res.render('hello', data);
});

router.post('/post', (req, res, next) => {
  const message = req.body.message;
  console.log(message);
  const msg = `あなたは「${message}」と書きました`;
  const data = {
    title: 'Hello',
    content: msg
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
