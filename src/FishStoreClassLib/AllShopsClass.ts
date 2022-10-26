import SportFish from "./SportFishClass";
import FishDeal from "./FishDealClass";
import ICommonFishProduct from "./ICommonStoreItemData";
class AllItemShops {
  public async getAllItems(searchTerm: string): Promise<ICommonFishProduct[]> {
    const fishDealItemsArr: ICommonFishProduct[] =
      await new FishDeal().scrapeResults(searchTerm);
    const sportFishItemsArr: ICommonFishProduct[] =
      await new SportFish().scrapeResults(searchTerm);
    const allItems: ICommonFishProduct[] = [
      fishDealItemsArr,
      sportFishItemsArr,
    ].flatMap((ele) => ele);
    return allItems;
  }
}
export default AllItemShops;
