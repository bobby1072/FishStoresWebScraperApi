import cheerio from "cheerio";
import BasicProductScrapeClass from "./BasicProductScrapeClass";
import ICommonFishProduct from "./ICommonStoreItemData";
import { IAltAndSrc, INameAndLink } from "./IDataFinds";
class FishDeal extends BasicProductScrapeClass {
  public Url: string = "https://fishdeal.co.uk";
  public Store: string = "Fish Deal";
  public async scrapeResults(
    searchTerm: string
  ): Promise<ICommonFishProduct[]> {
    const searchedPage = await this.getInfoReq(
      `${this.Url}/search?q=${searchTerm}`
    );
    const $: cheerio.Root = cheerio.load(searchedPage);
    const allItems: cheerio.Cheerio = $("div.SC_DealsBlock-item");
    const nameLinkList: INameAndLink[] = [];
    const tempImgList: IAltAndSrc[] = [];
    const priceList: number[] = [];
    allItems
      .find("div > div > a > span > img")
      .each(function (index: number, element: cheerio.Element) {
        const imgData: string | undefined = $(element).attr("data-src");
        const imgAlt: string | undefined = $(element).attr("alt");
        if (imgData && imgAlt) {
          const imgJson = { ImageSrc: imgData, ImageAlt: imgAlt };
          tempImgList.push(imgJson);
        }
      });
    allItems
      .find("div > div > a")
      .each(function (index: number, element: cheerio.Element) {
        const dealData: string | undefined =
          $(element).attr("data-gtm-payload");
        const itemLink: string | undefined = $(element).attr("href");
        const parsedDealData = dealData && JSON.parse(dealData);
        parsedDealData &&
          parsedDealData.ecommerce.click.products[0] &&
          itemLink &&
          nameLinkList.push({
            Name: parsedDealData.ecommerce.click.products[0].name,
            Link: itemLink,
            Brand: parsedDealData.ecommerce.click.products[0].brand,
          });
        const newPrice: number = Number(
          parsedDealData.ecommerce.click.products[0].price
        );
        newPrice && priceList.push(newPrice);
      });
    const finalItemArray: ICommonFishProduct[] = this.makeFinalItemsArray(
      nameLinkList,
      tempImgList,
      priceList,
      searchTerm
    );
    return finalItemArray;
  }
}
export default FishDeal;
