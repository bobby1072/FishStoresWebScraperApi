import SportFish from "./SportFishClass";
import FishDeal from "./FishDealClass";
import ICommonFishProduct from "./ICommonStoreItemData";
import TotalFishing from "./TotalFishingClass";
import PrimitiveScrapeClass from "./PrimitiveScrapeClass";
import GlasgowAngling from "./GlasgowAnglingClass";
class AllItemShops extends PrimitiveScrapeClass {
  public async getAllItems(searchTerm: string): Promise<ICommonFishProduct[]> {
    const fishDealItemsArr: ICommonFishProduct[] =
      await new FishDeal().scrapeResults(searchTerm);
    const sportFishItemsArr: ICommonFishProduct[] =
      await new SportFish().scrapeResults(searchTerm);
    const totalFishingItems: ICommonFishProduct[] =
      await new TotalFishing().scrapeResults(searchTerm);
    const glasgowAnglingItems: ICommonFishProduct[] =
      await new GlasgowAngling().scrapeResults(searchTerm);
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
