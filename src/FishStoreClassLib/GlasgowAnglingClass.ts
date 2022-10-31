import BasicProductScrapeClass from "./BasicProductScrapeClass";
import ICommonFishProduct from "./ICommonStoreItemData";
import cheerio from "cheerio";
import { IAltAndSrc, INameAndLink } from "./IDataFinds";
class GlasgowAngling extends BasicProductScrapeClass {
  public Url: string = "https://www.fishingmegastore.com";
  public Store: string = "Glasgow Angling";
  public async scrapeResults(
    searchTerm: string
  ): Promise<ICommonFishProduct[] | []> {
    const pageData = await this.getInfoReq(
      `${this.Url}/view.php?module=productsnew&search=${searchTerm}&searchbutton=`
    );
    const $: cheerio.Root = cheerio.load(pageData);
    const allProds: cheerio.Cheerio = $("div.productlistcon");
    const nameLinkList: INameAndLink[] = [];
    const imageAltList: IAltAndSrc[] = [];
    const priceDataList: number[] = [];
    allProds
      .find("div > div > a")
      .each((index: number, element: cheerio.Element) => {
        const prodUrl: string = `${this.Url}${$(element).attr("href")}`.replace(
          " ",
          "%20"
        );
        const prodName: string | undefined = $(element).attr("title");
        if (prodName) {
          const nameData: INameAndLink = { Name: prodName, Link: prodUrl };
          nameData && nameLinkList.push(nameData);
        }
        $(element)
          .find("a > div > img")
          .each((imgIndex, imgElement) => {
            const imgSrc: string | undefined = $(imgElement).attr("src");
            const imgAlt: string | undefined = $(imgElement).attr("alt");
            if (typeof imgSrc === "string" && typeof imgAlt === "string") {
              imageAltList.push({
                ImageSrc: imgSrc.replace(" ", "%20"),
                ImageAlt: imgAlt,
              });
            }
          });
      });
    const allProdPrices: cheerio.Cheerio = $("span.pricing_now");
    allProdPrices.each((index: number, element: cheerio.Element) => {
      const price = Number($(element).text().replace("£", ""));
      price && priceDataList.push(price);
    });
    const finalItemArray: ICommonFishProduct[] = this.makeFinalItemsArray(
      nameLinkList,
      imageAltList,
      priceDataList,
      searchTerm
    );
    return finalItemArray;
  }
}
export default GlasgowAngling;
