var express = require('express');
var router = express.Router();
const mysql = require('mysql');

const MYSQL_SETTING = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my_node_app'
};

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
    content: '新しいレコードを入力してください'
  };
  res.render('db/add', data);
});

// 新規作成フォーム送信の処理
router.post('/add', (req, res, next) => {
  const data = { name, mail, age } = req.body;
  // コネクションの用意
  const connection = mysql.createConnection(MYSQL_SETTING);
  // DB接続
  connection.connect();
  // データを登録
  connection.query('insert into userdata set ?', data, (error, results, fields) => {
    console.log(results);
    res.redirect('/db');
  });
  // DB接続解除
  connection.end();
});

module.exports = router;
