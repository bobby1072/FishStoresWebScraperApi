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
  private findPricePerUnit(
    prodArr: ICommonFishProduct[]
  ): ICommonFishProduct[] {
    return prodArr.map((element) => {
      const itemUnits: RegExpMatchArray | null =
        element.Name.match(/(\d+) pcs/) ||
        element.Name.match(/(\d+)pcs/) ||
        element.Name.match(/(\d+)pc/) ||
        element.Name.match(/(\d+) pc/);
      itemUnits
        ? (element.Units = Number(itemUnits[1]))
          ? (element.Name = element.Name.replace(itemUnits[0], ""))
          : null
        : null;
      return element;
    });
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
    return this.makeItemsUnique(
      this.sortResults(searchTerm, this.findPricePerUnit(finalItemArray))
    );
  }
  public abstract scrapeResults(
    searchTerm: string
  ): Promise<ICommonFishProduct[] | []>;
}
export default BasicProductScrapeClass;
