import BasicProductScrapeClass from "./BasicProductScrapeClass";
import cheerio from "cheerio";
import ICommonFishProduct from "./ICommonStoreItemData";
interface ISportFishProd {
  Name: string;
  Link: string;
  ImageSrc: string;
  ImageAlt: string;
  Price: number;
}
export class SportFish extends BasicProductScrapeClass {
  public Url: string = "https://www.sportfish.co.uk";
  public async scrapeResults(
    searchTerm: string
  ): Promise<ICommonFishProduct[] | []> {
    const anglingDirPage = await this.getInfoReq(
      `${this.Url}/catalogsearch/result/?q=+${searchTerm}`
    );
    const $ = cheerio.load(anglingDirPage);
    const productLinkAndNameList: any[] = [];
    const allProductLinks = $("a.product-item-link");
    allProductLinks.each((index, element) => {
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
    allProductPrices.each((index, element) => {
      const productPrice = $(element).attr("data-price-amount");
      try {
        productPrice && productPriceList.push(Number(productPrice));
      } catch (e) {}
    });
    const finalItemArray: ICommonFishProduct[] = productLinkAndNameList.map(
      (element, index) => {
        const ImageSrcAlt = productImgSrcAndAlt.find((imgElement) => {
          return element.Name === imgElement.ImageAlt;
        });
        const prodPrice = productPriceList[index];
        const sportFishProd: ICommonFishProduct = {
          Name: element.Name,
          Price: prodPrice,
          Store: "Sport fish",
          BaseLink: this.Url,
          ImageSrc: ImageSrcAlt.ImageSrc,
          ProductLink: element.Link,
        };
        return sportFishProd;
      }
    );
    return finalItemArray;
  }
}
