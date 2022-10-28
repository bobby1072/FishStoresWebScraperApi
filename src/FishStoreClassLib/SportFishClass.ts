import BasicProductScrapeClass from "./BasicProductScrapeClass";
import cheerio from "cheerio";
import ICommonFishProduct from "./ICommonStoreItemData";
class SportFish extends BasicProductScrapeClass {
  public Url: string = "https://www.sportfish.co.uk";
  public Store: string = "Sport fish";
  public async scrapeResults(
    searchTerm: string
  ): Promise<ICommonFishProduct[] | []> {
    const anglingDirPage = await this.getInfoReq(
      `${this.Url}/catalogsearch/result/?q=+${searchTerm}`
    );
    const $: cheerio.Root = cheerio.load(anglingDirPage);
    const productLinkAndNameList: any[] = [];
    const allProductLinks: cheerio.Cheerio = $("a.product-item-link");
    allProductLinks.each((index: number, element: cheerio.Element) => {
      const productLink = $(element).attr("href");
      const productName = $(element).text();
      productLink &&
        productName &&
        productLinkAndNameList.push({ Name: productName, Link: productLink });
    });
    const allProductImgs = $("img.product-image-photo");
    const productImgSrcAndAlt: any[] = [];
    allProductImgs.each((index, element) => {
      const productImgSrc = $(element).attr("src");
      const productImgAlt = $(element).attr("alt");
      productImgSrc &&
        productImgAlt &&
        productImgSrcAndAlt.push({
          ImageSrc: productImgSrc,
          ImageAlt: productImgAlt,
        });
    });
    const allProductPrices = $("span.price-wrapper");
    const productPriceList: any[] = [];
    allProductPrices.each((index: number, element: cheerio.Element) => {
      const productPrice = $(element).attr("data-price-amount");
      try {
        productPrice && productPriceList.push(Number(productPrice));
      } catch (e) {}
    });
    const finalItemArray: ICommonFishProduct[] = this.makeFinalItemsArray(
      productLinkAndNameList,
      productImgSrcAndAlt,
      productPriceList
    );
    return finalItemArray;
  }
}
export default SportFish;
