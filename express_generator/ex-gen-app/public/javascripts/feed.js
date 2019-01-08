'use strict';

function fetchJson(url) {
  return fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('fail...');
    })
    .catch(err => {
      return err;
    });
}

function handleClick() {
  const feedArea = document.getElementById('js-feedArea');
  if (!feedArea) return;

  fetchJson('/feed/json')
    .then(data => {
      console.log(data);
      
      feedArea.innerHTML = `
        <ol>
          ${data.map(item => `<li><a href="${item.link[0]}">${item.title[0]}</a></li>`).join('')}
        </ol>
      `;
    })
    .catch(err => {
      feedArea.innerHTML = err;
    });
}

function init() {
  const feedBtn = document.getElementById('js-feedBtn');
  if (!feedBtn) return;
  feedBtn.addEventListener('click', handleClick);
}

init();