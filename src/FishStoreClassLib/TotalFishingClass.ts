import BasicProductScrapeClass from "./BasicProductScrapeClass";
import ICommonFishProduct from "./ICommonStoreItemData";
import cheerio from "cheerio";
import { IAltAndSrc, INameAndLink } from "./IDataFinds";
class TotalFishing extends BasicProductScrapeClass {
  public Url: string = "https://www.total-fishing-tackle.com";
  public Store: string = "Total Fishing";
  public async scrapeResults(
    searchTerm: string
  ): Promise<ICommonFishProduct[] | []> {
    const pageData = await this.getInfoReq(
      `${this.Url}/catalogsearch/result/?q=${searchTerm}`
    );
    const $: cheerio.Root = cheerio.load(pageData);
    const allProds: cheerio.Cheerio = $("div.product-item-info");
    const imageAltList: IAltAndSrc[] = [];
    const nameLinkList: INameAndLink[] = [];
    const priceDataList: number[] = [];
    allProds
      .find("div > a > span > span > img")
      .each((index: number, element: cheerio.Element) => {
        const imageSrc: string | undefined = $(element).attr("src");
        const imageAlt: string | undefined = $(element).attr("alt");
        if (typeof imageAlt === "string" && typeof imageSrc === "string") {
          const imgData: IAltAndSrc = {
            ImageSrc: imageSrc,
            ImageAlt: imageAlt,
          };
          imgData && imageAltList.push(imgData);
        }
      });
    allProds
      .find("div > div > strong > a")
      .each((index: number, element: cheerio.Element) => {
        const prodLink: string | undefined = $(element).attr("href");
        const prodName: string = $(element).text();
        if (typeof prodLink === "string") {
          const nameData: INameAndLink = {
            Link: prodLink,
            Name: prodName,
          };
          nameData && nameLinkList.push(nameData);
        }
      });
    const priceData: cheerio.Cheerio = $("[data-price-type=finalPrice]");
    priceData.each((index: number, element: cheerio.Element) => {
      const price: string | undefined = $(element).attr("data-price-amount");
      try {
        price && priceDataList.push(Number(price));
      } catch (e) {}
    });
    const finalItemArray: ICommonFishProduct[] = this.makeFinalItemsArray(
      nameLinkList,
      imageAltList,
      priceDataList
    );
    return finalItemArray;
  }
}
export default TotalFishing;
