import BasicProductScrapeClass from "./BasicProductScrapeClass";
import { IFishDealProduct } from "./FishDealClass";

export class AnglingDirect extends BasicProductScrapeClass {
  public Url: string = "https://www.anglingdirect.co.uk/";
  public async scrapeResults(searchTerm: string): Promise<void> {
    const anglingDirPage = this.getInfoReq(
      `${this.Url}catalogsearch/result/?q=${searchTerm}`
    );
  }
}
