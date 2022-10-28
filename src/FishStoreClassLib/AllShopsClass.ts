import SportFish from "./SportFishClass";
import FishDeal from "./FishDealClass";
import ICommonFishProduct from "./ICommonStoreItemData";
import TotalFishing from "./TotalFishingClass";
import PrimitiveScrapeClass from "./PrimitiveScrapeClass";
class AllItemShops extends PrimitiveScrapeClass {
  public async getAllItems(searchTerm: string): Promise<ICommonFishProduct[]> {
    const fishDealItemsArr: ICommonFishProduct[] =
      await new FishDeal().scrapeResults(searchTerm);
    const sportFishItemsArr: ICommonFishProduct[] =
      await new SportFish().scrapeResults(searchTerm);
    const totalFishingItems: ICommonFishProduct[] =
      await new TotalFishing().scrapeResults(searchTerm);
    const allItems: ICommonFishProduct[] = this.sortResults(
      searchTerm,
      [fishDealItemsArr, sportFishItemsArr, totalFishingItems].flatMap(
        (ele) => ele
      )
    );
    return allItems;
  }
}
export default AllItemShops;
