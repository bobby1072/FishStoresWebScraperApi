import cheerio from "cheerio";
import BasicProductScrapeClass from "./BasicProductScrapeClass";
import ICommonFishProduct from "./ICommonStoreItemData";
class FishDeal extends BasicProductScrapeClass {
  public Url: string = "https://fishdeal.co.uk";
  public Store: string = "Fish Deal";
  public async scrapeResults(
    searchTerm: string
  ): Promise<ICommonFishProduct[]> {
    const searchedPage = await this.getInfoReq(
      `${this.Url}/search?q=${searchTerm}`
    );
    const $ = cheerio.load(searchedPage);
    const allItems = $("div.SC_DealsBlock-item");
    const tempDataList: any[] = [];
    const tempImgList: any[] = [];
    allItems.find("div > div > a > span > img").each(function (index, element) {
      const imgData: string | undefined = $(element).attr("data-src");
      const imgAlt: string | undefined = $(element).attr("alt");
      const imgJson = { src: imgData, alt: imgAlt };
      tempImgList.push(imgJson);
    });
    allItems.find("div > div > a").each(function (index, element) {
      const dealData: string | undefined = $(element).attr("data-gtm-payload");
      const itemLink: string | undefined = $(element).attr("href");
      const parsedDealData = dealData && JSON.parse(dealData);
      parsedDealData.ecommerce.click.products[0].productLink = itemLink;
      parsedDealData &&
        parsedDealData.ecommerce.click.products[0] &&
        tempDataList.push(parsedDealData.ecommerce.click.products[0]);
    });
    const finalItemArray: ICommonFishProduct[] = tempDataList.map((element) => {
      const newPrice: number = Number(element.price);
      const fishDealProd: ICommonFishProduct = {
        Brand: element.brand,
        Name: element.name,
        Price: newPrice,
        Store: this.Store,
        BaseLink: this.Url,
        ImageSrc: `${this.Url}${
          tempImgList.find((imgElement) => {
            return imgElement.alt === element.name;
          }).src
        }`,
        ProductLink: element.productLink,
      };
      return fishDealProd;
    });
    return finalItemArray;
  }
}
export default FishDeal;
