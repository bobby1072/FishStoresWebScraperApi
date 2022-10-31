import httpClient from "../Utils/httpClient";
import ICommonFishProduct from "./ICommonStoreItemData";
import { IAltAndSrc, INameAndLink } from "./IDataFinds";
import PrimitiveScrapeClass from "./PrimitiveScrapeClass";
abstract class BasicProductScrapeClass extends PrimitiveScrapeClass {
  abstract readonly Url: string;
  abstract readonly Store: string;
  protected async getInfoReq(searchUrl: string) {
    const fishInfoReq = await httpClient.get(searchUrl);
    const fishInfoData = await fishInfoReq.data;
    return fishInfoData;
  }
  private makeItemsUnique(prodArr: ICommonFishProduct[]): ICommonFishProduct[] {
    const clean: ICommonFishProduct[] = prodArr.filter(
      (arr, index, self) =>
        index ===
        self.findIndex(
          (t) => t.Name === arr.Name && t.BaseLink === arr.BaseLink
        )
    );
    return clean;
  }
  protected makeFinalItemsArray(
    productLinkAndNameList: INameAndLink[],
    productImgSrcAndAlt: IAltAndSrc[],
    productPriceList: number[],
    searchTerm: string
  ): ICommonFishProduct[] {
    const finalItemArray: ICommonFishProduct[] = productLinkAndNameList.map(
      (element, index) => {
        const ImageSrcAlt = productImgSrcAndAlt.find((imgElement) => {
          return element.Name === imgElement.ImageAlt;
        });
        const prodPrice = productPriceList[index];
        const sportFishProd: ICommonFishProduct = {
          ...(element.Brand && { Brand: element.Brand }),
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
    return this.makeItemsUnique(this.sortResults(searchTerm, finalItemArray));
  }
  public abstract scrapeResults(
    searchTerm: string
  ): Promise<ICommonFishProduct[] | []>;
}
export default BasicProductScrapeClass;
