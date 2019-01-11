var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  const data = {
    title: 'Bookshelf',
    content: 'this is bookshelf page.'
  };
  res.render('bookshelf/index', data);
});

module.exports = router;