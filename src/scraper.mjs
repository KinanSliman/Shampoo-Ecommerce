import puppeteer from "puppeteer";
import fs from "fs";

(async () => {
  try {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    console.log("Navigating to Amazon UAE...");
    await page.goto("https://www.amazon.ae/s?k=shampoo", {
      //waitUntil: "networkidle2",
    });
    let queryTracker = 0;
    console.log("Waiting for shampoo results selectors on amazon website ...");
    while (queryTracker == 0) {
      try {
        await page.waitForSelector(
          ".sg-col-4-of-24.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.s-widget-spacing-small.sg-col-4-of-20",
          {
            timeout: 30000,
          }
        );
        queryTracker = 1;
      } catch (error) {
        console.log("error on quering attempt at:", new Date());
      }
    }

    console.log("Scraping products...");

    const products = await page.$$eval(
      ".a-size-base-plus.a-color-base.a-text-normal",
      (elements) => elements.map((el) => el.textContent)
    );
    const slicedProducts = products.slice(0, 1).map((productName) => ({
      name: productName,
    }));
    products.click;

    console.log("Products scraped:", slicedProducts);

    console.log("Saving products to JSON file...");
    fs.writeFileSync(
      "shampoo_products.json",
      JSON.stringify(slicedProducts, null, 2),
      "utf-8"
    );
    console.log("Products saved to shampoo_products.json");

    console.log("Closing browser...");
    await browser.close();
    console.log("Browser closed.");
  } catch (error) {
    console.error("Error occurred:", error);
  }
})();
