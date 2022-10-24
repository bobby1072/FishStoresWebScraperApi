import httpClient from "../Utils/httpClient";
import cheerio from "cheerio";
import BasicProductScrapeClass from "./BasicProductScrapeClass";

class FishDeal extends BasicProductScrapeClass {
  public Url: string = "https://fishdeal.co.uk/";
  public async scrapeResults(searchTerm: string): Promise<void> {
    const searchedPage = await this.getInfoReq(
      `${this.Url}/search?q=${searchTerm}`
    );
    const $ = cheerio.load(searchedPage);
    const allItems = $("div.SC_DealsBlock-item");
    /*const dataArr = allItems.map((element) => {
      return element.children.
    });*/
    console.log(searchedPage);
  }
  /*public async scrapeResults(searchTerm: string, browser?: any) {
    if (!browser) {
      const Puppeteer = require("puppeteer");
      const browser = await Puppeteer.launch();
    }
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
    await page.close();
  }*/
}
export default FishDeal;
