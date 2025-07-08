async function loadStories() {
  const proxy = 'https://api.allorigins.win/raw?url=';
  const rssURL = encodeURIComponent('https://abcnews.go.com/abcnews/topstories');
  const res = await fetch(proxy + rssURL);
  const text = await res.text();
  const xml = new DOMParser().parseFromString(text, 'application/xml');
  const items = xml.querySelectorAll('item');
  const ul = document.getElementById('stories-list');
  ul.innerHTML = '';
  items.forEach((item, i) => {
    if(i >= 10) return;
    const title = item.querySelector('title').textContent;
    const link = item.querySelector('link').textContent;
    const li = document.createElement('li');
    li.innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
    ul.appendChild(li);
  });
}
loadStories();
