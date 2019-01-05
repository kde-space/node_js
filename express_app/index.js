const express = require('express');
const ejs = require('ejs');

const app = express();
// アプリケーションで使うレンダリングエンジンの設定
app.engine('ejs', ejs.renderFile);
// publicフォルダを参照できるように設定
app.use(express.static('public'));

// トップページ
app.get('/', (req, res) => {
  const msg = 'This is Index Page!<br>これはトップページです';
  const url = '/other?name=tom&pass=123'
  res.render('index.ejs', {
    title: 'Index',
    content: msg,
    link: {
      href: url,
      text: '※別のページに移動'
    }
  });
});

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