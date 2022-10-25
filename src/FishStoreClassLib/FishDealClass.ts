import cheerio from "cheerio";
import BasicProductScrapeClass from "./BasicProductScrapeClass";
export interface IFishDealProduct {
  brand: string;
  category: string;
  id: string;
  name: string;
  position: number;
  price: number;
  store: string;
  baseLink: string;
  imageSrc: string;
  productLink: string;
}
export class FishDeal extends BasicProductScrapeClass {
  public Url: string = "https://fishdeal.co.uk";
  public async scrapeResults(searchTerm: string): Promise<IFishDealProduct[]> {
    const searchedPage = await this.getInfoReq(
      `${this.Url}/search?q=${searchTerm}`
    );
    const $ = cheerio.load(searchedPage);
    const allItems = $("div.SC_DealsBlock-item");
    const tempDataList: any[] = [];
    const tempImgList: any[] = [];
    allItems.find("div > div > a > span > img").each(function (index, element) {
      const imgData = $(element).attr("data-src");
      const imgAlt = $(element).attr("alt");
      const imgJson = { src: imgData, alt: imgAlt };
      tempImgList.push(imgJson);
    });
    allItems.find("div > div > a").each(function (index, element) {
      const dealData = $(element).attr("data-gtm-payload");
      const itemLink = $(element).attr("href");
      const parsedDealData = dealData && JSON.parse(dealData);
      parsedDealData.ecommerce.click.products[0].productLink = itemLink;
      parsedDealData &&
        parsedDealData.ecommerce.click.products[0] &&
        tempDataList.push(parsedDealData.ecommerce.click.products[0]);
    });
    const finalItemArray: IFishDealProduct[] = tempDataList.map((element) => {
      const newPrice: number | boolean = element.price && Number(element.price);
      newPrice && (element.price = newPrice);
      element.imageSrc = `${this.Url}${
        tempImgList.find((imgElement) => {
          return imgElement.alt === element.name;
        }).src
      }`;
      element.store = "Fish Deal";
      element.baseLink = this.Url;
      element.productLink = `${this.Url}${element.productLink}`;
      return element;
    });
    return finalItemArray;
  }
}
