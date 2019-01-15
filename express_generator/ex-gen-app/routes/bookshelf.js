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

router.get('/add', (req, res, next) => {
  const data = {
    title: 'Bookshelf/add',
    content: '新しいレコードを入力'
  };
  res.render('bookshelf/add', data);
});

router.post('/add', (req, res, next) => {
  const data = { name, mail, age } = req.body;
  const connection = mysql.createConnection(MYSQL_SETTING);
  connection.connect();
  connection.query('insert into userdata set ?', data, (error, results, fields) => {
    if (error === null) {
      res.redirect('/bookshelf');
    }
  });
  connection.end();
});

router.get('/show', (req, res, next) => {
  const id = req.query.id;
  const connection = mysql.createConnection(MYSQL_SETTING);
  connection.connect();
  connection.query('select * from userdata where id = ?', id, (error, results, fields) => {
    if (error === null) {
      const data = {
        title: 'Bookshelf/show',
        content: `id = ${id} のレコード`,
        mydata: results[0]
      };
      res.render('bookshelf/show', data);
    }
  });
  connection.end();
});

router.get('/edit', (req, res, next) => {
  const id = req.query.id;
  const connection = mysql.createConnection(MYSQL_SETTING);
  connection.connect();
  connection.query('select * from userdata where id = ?', id, (error, results, fields) => {
    if (error === null) {
      const data = {
        title: 'Bookshelf/show',
        content: `id = ${id} のレコード`,
        mydata: results[0]
      };
      res.render('bookshelf/edit', data);
    }
  });
  connection.end();
});

router.post('/edit', (req, res, text) => {
  const { id, name, mail, age } = req.body;
  const data = { name, mail, age };
  const connection = mysql.createConnection(MYSQL_SETTING);
  connection.connect();
  connection.query('update userdata set ? where id = ?', [data, id], (error, results, fields) => {
    if (error === null) {
      res.redirect('/bookshelf');
    }
  });
  connection.end();
});

module.exports = router;