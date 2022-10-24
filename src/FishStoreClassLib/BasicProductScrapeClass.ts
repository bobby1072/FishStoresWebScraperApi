import httpClient from "../Utils/httpClient";
abstract class BasicProductScrapeClass {
  public abstract Url: string;
  public async getInfoReq(searchUrl: string) {
    const fishInfoReq = await httpClient.get(searchUrl);
    const fishInfoData = await fishInfoReq.data;
    return fishInfoData;
  }
  public abstract scrapeResults(searchTerm: string): Promise<void>;
}
export default BasicProductScrapeClass;
