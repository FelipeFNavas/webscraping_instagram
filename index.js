import puppetter from "puppeteer";
import fs from "fs";

(async () => {
  const browser = await puppetter.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://www.instagram.com/rocketseat_oficial/");

  const imgList = await page.evaluate(() => {
    // pegar imagens da página
    const nodeList = document.querySelectorAll("article img");
    // transformar o nodelist em array
    const imgArray = [...nodeList];
    // transformar os nodes (elementos em html) em objetos Js
    const imgList = imgArray.map(({ src }) => ({
      src,
    }));
    // retornar da função
    return imgList;
  });

  // escrever os dados em um json
  fs.writeFile("instagram.json", JSON.stringify(imgList, null, 2), (err) => {
    if (err) {
      throw new Error(err);
    }
    console.log("its ok");
  });
  await browser.close();
})();
