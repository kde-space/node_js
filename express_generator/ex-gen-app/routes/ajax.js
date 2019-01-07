const express = require('express');
const router = express.Router();

const data = [
  {
    name: 'Taro',
    age: 35,
    mail: 'taro@japan.com'
  },
  {
    name: 'Tom',
    age: 25,
    mail: 'tom@america.com'
  },
  {
    name: 'Lin',
    age: 33,
    mail: 'lin@china.com'
  }
];

router.get('/', (req, res, next) => {
  const id = req.query.id;
  res.json(data[id]);
});

module.exports = router;