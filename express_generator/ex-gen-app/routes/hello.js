var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const name = req.query.name;
  const mail = req.query.mail;
  const data = {
    title: 'Hello',
    content: `あなたの名前は「${name}」<br>メールアドレスは「${mail}」`
  }
  res.render('hello', data);
});

router.get('/hoge', function(req, res, next) {
  const data = {
    title: 'Hello hoge',
    content: 'これはhello/hoge ページです<br>This is hello/hoge content.'
  }
  res.render('hello', data);
});

module.exports = router;
