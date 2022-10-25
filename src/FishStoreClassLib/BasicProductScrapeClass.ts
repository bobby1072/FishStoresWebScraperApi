import httpClient from "../Utils/httpClient";
import ICommonFishProduct from "./ICommonStoreItemData";
abstract class BasicProductScrapeClass {
  abstract readonly Url: string;
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
