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
      console.log(fields);
      const data = {
        title: 'Mysql',
        content: results
      };
      res.render('db', data);
    }
  });
  // 接続を解除
  connection.end();
});

module.exports = router;
