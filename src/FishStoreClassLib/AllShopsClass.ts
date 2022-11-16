import SportFish from "./SportFishClass";
import FishDeal from "./FishDealClass";
import ICommonFishProduct from "./ICommonStoreItemData";
import TotalFishing from "./TotalFishingClass";
import PrimitiveScrapeClass from "./PrimitiveScrapeClass";
import GlasgowAngling from "./GlasgowAnglingClass";
class AllItemShops extends PrimitiveScrapeClass {
  public async getAllItems(searchTerm: string): Promise<ICommonFishProduct[]> {
    const [
      fishDealItemsArr,
      sportFishItemsArr,
      totalFishingItems,
      glasgowAnglingItems,
    ] = await Promise.all([
      new FishDeal().scrapeResults(searchTerm),
      new SportFish().scrapeResults(searchTerm),
      new TotalFishing().scrapeResults(searchTerm),
      new GlasgowAngling().scrapeResults(searchTerm),
    ]);
    const allItems: ICommonFishProduct[] = this.sortResults(
      searchTerm,
      [
        fishDealItemsArr,
        sportFishItemsArr,
        totalFishingItems,
        glasgowAnglingItems,
      ].flatMap((ele) => ele)
    );
    return allItems;
  }
}
export default AllItemShops;
