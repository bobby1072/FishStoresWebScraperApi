import BasicProductScrapeClass from "./BasicProductScrapeClass";
export class AnglingDirect extends BasicProductScrapeClass {
  public Url: string = "https://www.anglingdirect.co.uk";
  public async scrapeResults(searchTerm: string): Promise<void> {
    const anglingDirPage = await this.getInfoReq(
      `${this.Url}/catalogsearch/result/?q=${searchTerm}`
    );
  }
}
