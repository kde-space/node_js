const express = require('express');
const router = express.Router();
const http = require('https');
const parseString = require('xml2js').parseString;

router.get('/', (req, res, next) => {
  const option = {
    host: 'news.google.com',
    port: 443,
    path: '/rss/topics/CAAqKAgKIiJDQkFTRXdvSkwyMHZNR1ptZHpWbUVnSnFZUm9DU2xBb0FBUAE?hl=ja&gl=JP&ceid=JP:ja'
  };
  http.get(option, res2 => {
    let body = '';
    res2.on('data', data => {
      body += data;
    });
    res2.on('end', () => {
      parseString(body.trim(), (err, result) => {
        console.log(result.rss.channel[0]);
        const data = {
          title: 'Feed',
          content: result.rss.channel[0].item
        };
        res.render('feed', data);
      })
    })
  });
});

router.get('/json', (req, res, next) => {
  const option = {
    host: 'news.google.com',
    port: 443,
    path: '/rss/topics/CAAqKAgKIiJDQkFTRXdvSkwyMHZNR1ptZHpWbUVnSnFZUm9DU2xBb0FBUAE?hl=ja&gl=JP&ceid=JP:ja'
  };
  http.get(option, res2 => {
    let body = '';
    res2.on('data', data => {
      body += data;
    });
    res2.on('end', () => {
      parseString(body.trim(), (err, result) => {
        res.json(result.rss.channel[0].item);
      })
    })
  });
});

module.exports = router;