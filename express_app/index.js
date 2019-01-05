const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();
// アプリケーションで使うレンダリングエンジンの設定
app.engine('ejs', ejs.renderFile);
// publicフォルダを参照できるように設定
app.use(express.static('public'));
// URLエンコードされたbodyを返すように設定
app.use(bodyParser.urlencoded({ extended: false }));

const data = {
  Taro: 'taro@Japam',
  Tom: 'tom@America',
  Bob: 'bob@Austraia'
};

// トップページ
app.get('/', (req, res) => {
  const msg = 'This is Index Page!<br>これはトップページです';
  const url = '/other?name=tom&pass=123'
  res.render('index.ejs', {
    data,
    title: 'Index',
    content: msg,
    link: {
      href: url,
      text: '※別のページに移動',
    }
  });
});

app.post('/', (req, res) => {
  const msg = `This is Posted Page!<br>あなたは「<strong>${req.body.message}</strong>」と送信しました。`
  res.cookie('message', req.body.message);
  res.redirect(303, '/');
  // const url = '/other?name=tom&pass=123';
  // res.render('index.ejs', {
  //   title: 'Posted',
  //   content:msg,
  //   link: {
  //     href: url,
  //     text: '※別のページに移動'
  //   }
  // });
  // setTimeout(() => {
  // }, 3000);
})

// otherページ
app.get('/other', (req, res) => {
  const { name, pass }  = req.query;
  const msg = `あなたの名前は「${name}」<br>パスワードは「${pass}」です`;
  res.render('index.ejs', {
    title: 'Other',
    content: msg,
    link: {
      href: '/',
      text: '※トップに戻る'
    }
  });
});

app.listen(3000, () => {
  console.log('Start server port:3000');
});