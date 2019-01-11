var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const MYSQL_SETTING = require('../db/setting');

/* GET home page. */
router.get('/', function(req, res, next) {
  // コネクションの用意
  const connection = mysql.createConnection(MYSQL_SETTING);
  // DB接続
  connection.connect();
  // データを取り出す
  connection.query('select * from userdata', (error, results, fields) => {
    if (error === null) {
      const data = {
        title: 'Mysql',
        content: results
      };
      res.render('db/index', data);
    }
  });
  // 接続を解除
  connection.end();
});

// 新規ページへのアクセス
router.get('/add', (req, res, next) => {
  const data = {
    title: 'Db/add',
    content: '新しいレコードを入力してください',
    form: {
      name: '',
      mail: '',
      age: 0
    }
  };
  res.render('db/add', data);
});

// 新規作成フォーム送信の処理
router.post('/add', (req, res, next) => {
  req.check('name', 'NAME は必ず入力してください。').notEmpty();
  req.check('mail', 'MAIL はメールアドレスを入力してください。').isEmail();
  req.check('age', 'AGE は年齢（整数）を入力してください').isInt();

  req.getValidationResult().then(result => {
    console.log('result.isEmpty() :', result.isEmpty());
    console.log('result.array() :', result.array());
    if (!result.isEmpty()) {
      let htmlOfError = '<ul class="error">';
      const resultAry = result.array();
      resultAry.forEach(item => {
        htmlOfError += `<li>${item.msg}</li>`;
      });
      htmlOfError += '</ul>';
      const data = {
        title: 'Db/add',
        content: htmlOfError,
        form: req.body
      };
      res.render('db/add', data);
    } else {
      const data = { name, mail, age } = req.body;
      // コネクションの用意
      const connection = mysql.createConnection(MYSQL_SETTING);
      // DB接続
      connection.connect();
      // データを登録
      connection.query('insert into userdata set ?', data, (error, results, fields) => {
        res.redirect('/db');
      });
      // DB接続解除
      connection.end();
    }
  });
});

// 指定レコードを表示
router.get('/show', (req, res, next) => {
  const id = req.query.id;
  const connection = mysql.createConnection(MYSQL_SETTING);
  connection.connect();
  connection.query('select * from userdata where id=?', id, (error, results, fields) => {
    if (error === null) {
      const data = {
        title: 'Db/show',
        content: `id = ${id} のレコード`,
        mydata: results[0]
      };
      res.render('db/show', data);
    }
  });
  connection.end();
});

// 指定レコードを編集
router.get('/edit', (req, res, next) => {
  const id = req.query.id;
  const connection = mysql.createConnection(MYSQL_SETTING);
  connection.connect();
  connection.query('select * from userdata where id = ?', id, (error, results, fields) => {
    if (error === null) {
      const data = {
        title: 'Db/edit',
        content: `id = ${id} のレコード`,
        mydata: results[0]
      };
      res.render('db/edit', data);
    }
  });
  connection.end();
});

// 編集フォーム送信の処理
router.post('/edit', (req, res, next) => {
  const { id, name, mail, age } = req.body;
  const data = { name, mail, age };
  const connection = mysql.createConnection(MYSQL_SETTING);
  connection.connect();
  connection.query('update userdata set ? where id = ?', [data, id], (error, results, fields) => {
    res.redirect('/db');
  });
  connection.end();
});

// 削除ページを表示
router.get('/delete', (req, res, next) => {
  const id = req.query.id;
  const connection = mysql.createConnection(MYSQL_SETTING);
  connection.connect();
  connection.query('select * from userdata where id = ?', id, (error, results, fields) => {
    if (error === null) {
      const data = {
        title: 'Db/delete',
        content: `id = ${id} のレコード`,
        mydata: results[0]
      };
      res.render('db/delete', data);
    }
  });
});

// 削除送信の処理
router.post('/delete', (req, res, next) => {
  const id = req.body.id;
  const connection = mysql.createConnection(MYSQL_SETTING);
  connection.connect();
  connection.query('delete from userdata where id = ?', id, (error, results, fields) => {
    if (error === null) {
      res.redirect('/db');
    }
  });
  connection.end();
});

module.exports = router;
