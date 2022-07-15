const request = new XMLHttpRequest();

request.open('GET', 'result.json');
request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
request.send();

const newsPage = document.querySelector('.news');
console.log(newsPage);

request.addEventListener('readystatechange', () => {
    if (request.readyState === 4 && request.status === 200) {
        let news = JSON.parse(request.response);
        Array.from(news);
        console.log(news)
        for (let itemNews = 0; itemNews < news.length; itemNews++) {
            newsPage.innerHTML += `<div class="news__item item-news">
                <h2 class="item-news__title">${news[itemNews].title}</h2>
                <img  class="item-news__img" src="${news[itemNews].image}" alt="">
            </div>`;
        }
    }
});

