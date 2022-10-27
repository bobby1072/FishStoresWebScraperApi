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
    const $ = cheerio.load(pageData);
    const allProds = $("div.product-item-info");
    const imageAltList: IAltAndSrc[] = [];
    const nameLinkList: INameAndLink[] = [];
    const priceDataList: number[] = [];
    allProds.find("div > a > span > span > img").each((index, element) => {
      const imageSrc = $(element).attr("src");
      const imageAlt = $(element).attr("alt");
      if (typeof imageAlt === "string" && typeof imageSrc === "string") {
        const imgData: IAltAndSrc = {
          ImageSrc: imageSrc,
          ImageAlt: imageAlt,
        };
        imgData && imageAltList.push(imgData);
      }
    });
    allProds.find("div > div > strong > a").each((index, element) => {
      const prodLink = $(element).attr("href");
      const prodName = $(element).text();
      if (typeof prodLink === "string") {
        const nameData: INameAndLink = {
          Link: prodLink,
          Name: prodName,
        };
        nameData && nameLinkList.push(nameData);
      }
    });
    const priceData = $("[data-price-type=finalPrice]");
    priceData.each((index, element) => {
      const price = $(element).attr("data-price-amount");
      try {
        price && priceDataList.push(Number(price));
      } catch (e) {}
    });
    /*const finalItemArray: ICommonFishProduct[] = imageAltList.map((element, index) => {
        const prodNameLink = nameLinkList.find((nameElement) => {
            return element.ImageAlt === nameElement.Name;
        });
        const prodPrice: number = priceDataList[index];
    });*/
    const finalItemArray: ICommonFishProduct[] = this.makeFinalItemsArray(
      nameLinkList,
      imageAltList,
      priceDataList
    );
    return finalItemArray;
  }
}
export default TotalFishing;
