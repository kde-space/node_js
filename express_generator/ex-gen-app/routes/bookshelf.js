const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const MYSQL_SETTING = require('../db/setting');

router.get('/', (req, res, next) => {
  const connection = mysql.createConnection(MYSQL_SETTING);
  connection.connect();
  connection.query('select * from userdata', (error, results, fields) => {
    if (error === null) {
      const data = {
        title: 'Bookshelf',
        content: results
      };
      res.render('bookshelf/index', data);
    }
  })
  connection.end();
});

module.exports = router;