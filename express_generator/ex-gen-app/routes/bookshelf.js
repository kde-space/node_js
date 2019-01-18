const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const MYSQL_SETTING = require('../db/setting');
const knex = require('knex')({
  dialect: 'mysql',
  connection: {
    ...MYSQL_SETTING,
    ...{
      charset: 'utf8'
    }
  }
});
const Bookshelf = require('bookshelf')(knex);
const UserData = Bookshelf.Model.extend({
  tableName: 'userdata'
});

router.get('/', (req, res, next) => {
  new UserData().fetchAll()
    .then((collection) => {
      const data = {
        title: 'Bookshelf',
        content: collection.toArray(),
        pagination: null
      };
      res.render('bookshelf/index', data);
    })
    .catch((err) => {
      res.status(500).json({
        error: true,
        data: {
          message: err.message
        }
      });
    });
});

router.get('/add', (req, res, next) => {
  const data = {
    title: 'Bookshelf/add',
    content: '新しいレコードを入力',
    form: {
      name: '',
      mail: '',
      age: 0
    }
  };
  res.render('bookshelf/add', data);
});

router.post('/add', (req, res, next) => {
  req.check('name', 'NAME は必ず入力してください').notEmpty();
  req.check('mail', 'MAIL はメールアドレスを入力してください').isEmail();
  req.check('age', 'AGE は年齢（整数）を入力してください').isInt();

  req.getValidationResult().then(result => {
    if (!result.isEmpty()) {
      let errorMsg = '<ul class="error">';
      const resultAry = result.array();
      resultAry.forEach(item => {
        errorMsg += `<li>${item.msg}</li>`
      });
      errorMsg += '</ul>';
      const data = {
        title: 'Bookshelf/add',
        content: errorMsg,
        form: req.body
      };
      res.render('bookshelf/add', data);
    } else {
      new UserData(req.body).save().then((model) => {
        res.redirect('/bookshelf');
      });
    }
  })
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

router.post('/edit', (req, res, next) => {
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

router.get('/delete', (req, res, next) => {
  const id = req.query.id;
  const connection = mysql.createConnection(MYSQL_SETTING);
  connection.connect();
  connection.query('delete from userdata where id = ?', id, (error, results, fields) => {
    if (error === null) {
      res.redirect('/bookshelf');
    }
  });
  connection.end();
});

router.get('/find', (req, res, next) => {
  const data = {
    title: 'Bookshelf/find',
    content: '検索IDを入力',
    form: {
      fstr: ''
    },
    mydata: null
  };
  res.render('bookshelf/find', data);
});

router.post('/find', (req, res, next) => {
  new UserData().where('id', '=', req.body.fstr).fetch()
    .then((collection) => {
      const data = {
        title: 'Bookshelf',
        content: `※id = ${req.body.fstr} の検索結果`,
        form: {
          fstr: req.body.fstr
        },
        mydata: collection
      };
      res.render('bookshelf/find', data);
    });
});

Bookshelf.plugin('pagination');

router.get('/:page', (req, res, next) => {
  let pg = req.params.page;
  pg *= 1;
  if (pg < 1) {
    pg = 1;
  }
  console.log(pg);
  
  new UserData().fetchPage({
    page:pg,
    pageSize: 3
  })
    .then(collection => {
      const data = {
        title: 'Bookshelf/index',
        content: collection.toArray(),
        pagination: collection.pagination
      };
      console.log(collection.pagination);
      res.render('bookshelf/index', data);
    })
    .catch(err => {
      res.status(500).json({
        error: true,
        data: {
          message: err.message
        }
      });
    });
});

module.exports = router;