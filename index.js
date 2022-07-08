const puppeteer = require('puppeteer');
const fs = require("fs");
const https = require("https");



let scrape = async () => {
    const browser = await puppeteer.launch(); //Открывает браузер
    const page = await browser.newPage(); // Создает страницу
    await page.goto('https://ria.ru/lenta/'); // Заходит на нужный адрес

    await page.waitForSelector('.list-item__title'); //Жду пока загрузиться селектор
    await page.setViewport({
        width: 2000,
        height: 3000
    }); // Задаем ширину страницы 
    const result = await page.evaluate(() => {
        let data = [];
        let elements = document.querySelectorAll('.list-item__title');
        for (let element of elements) {
            data.push({title: element.innerText});
        }
        return data;
    });
    console.log(result);
    fs.writeFile('result.json', JSON.stringify(result, null, ' '), err => {
        if(err) return err;
        console.log(`картинкаи пришли`);
    });
    await browser.close();
};

setInterval(() => {
    scrape();
}, 10000);

// https://ria.ru/lenta/
// .list - item__content
//     .list - item__title



