interface IWebScrapClass {
  Puppeteer: any;
  Url: string;
  scrapeResults: (searchTerm: string) => Promise<void>;
}
interface IScrapeResults {}
export class FishDeal implements IWebScrapClass {
  public Puppeteer = require("puppeteer");
  public Url = "https://fishdeal.co.uk/";
  async scrapeResults(searchTerm: string) {
    const browser = await this.Puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(this.Url);
    page.waitForSelector("input[name=q]");
    await page.$eval(
      "input[name=q]",
      (el: any, value: string) => (el.value = value),
      searchTerm
    );
    await page.click("button[type=submit]");
    await page.waitForNavigation({ waitUntil: "networkidle2" });
    await page.screenshot({
      path: "./screenshot.png",
      fullPage: true,
    });
    await browser.close();
  }
}
