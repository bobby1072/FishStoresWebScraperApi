import httpClient from "../Utils/httpClient";
import ICommonFishProduct from "./ICommonStoreItemData";
import { IAltAndSrc, INameAndLink } from "./IDataFinds";
abstract class BasicProductScrapeClass {
  abstract readonly Url: string;
  abstract readonly Store: string;
  public makeFinalItemsArray(
    productLinkAndNameList: INameAndLink[],
    productImgSrcAndAlt: IAltAndSrc[],
    productPriceList: number[]
  ): ICommonFishProduct[] {
    const finalItemArray: ICommonFishProduct[] = productLinkAndNameList.map(
      (element, index) => {
        const ImageSrcAlt = productImgSrcAndAlt.find((imgElement) => {
          return element.Name === imgElement.ImageAlt;
        });
        const prodPrice = productPriceList[index];
        const sportFishProd: ICommonFishProduct = {
          Name: element.Name,
          Price: prodPrice,
          Store: this.Store,
          BaseLink: this.Url,
          ...(ImageSrcAlt?.ImageSrc && { ImageSrc: ImageSrcAlt.ImageSrc }),
          ProductLink: element.Link,
        };
        return sportFishProd;
      }
    );
    return finalItemArray;
  }
  public async getInfoReq(searchUrl: string) {
    const fishInfoReq = await httpClient.get(searchUrl);
    const fishInfoData = await fishInfoReq.data;
    return fishInfoData;
  }
  public abstract scrapeResults(
    searchTerm: string
  ): Promise<ICommonFishProduct[] | []>;
}
export default BasicProductScrapeClass;
