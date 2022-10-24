import cheerio from "cheerio";
import BasicProductScrapeClass from "./BasicProductScrapeClass";
export interface IFishDealProduct {
  brand: string;
  category: string;
  id: string;
  name: string;
  position: number;
  price: number;
}
export class FishDeal extends BasicProductScrapeClass {
  public Url: string = "https://fishdeal.co.uk/";
  public async scrapeResults(searchTerm: string): Promise<IFishDealProduct[]> {
    const searchedPage = await this.getInfoReq(
      `${this.Url}/search?q=${searchTerm}`
    );
    const $ = cheerio.load(searchedPage);
    const allItems = $("div.SC_DealsBlock-item");
    let tempList: any[] = [];
    allItems.find("div > div > a").each(function (index, element) {
      const dealData = $(element).attr("data-gtm-payload");
      const parsedDealData = dealData && JSON.parse(dealData);
      parsedDealData &&
        parsedDealData.ecommerce.click.products[0] &&
        tempList.push(parsedDealData.ecommerce.click.products[0]);
    });
    const finalItemArray: IFishDealProduct[] = tempList.map((element) => {
      const newPrice: number | boolean = element.price && Number(element.price);
      newPrice && (element.price = newPrice);
      return element;
    });
    return finalItemArray;
  }
}
