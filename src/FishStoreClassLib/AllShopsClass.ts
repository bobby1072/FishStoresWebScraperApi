import { SportFish } from "./SportFishClass";
import { FishDeal } from "./FishDealClass";
import ICommonFishProduct from "./ICommonStoreItemData";
class AllItemShops {
  public async getAllItems(searchTerm: string): Promise<ICommonFishProduct[]> {
    const fishDealClass = new FishDeal();
    const fishDealItemsArr: ICommonFishProduct[] =
      await fishDealClass.scrapeResults(searchTerm);
    const sportFishClass = new SportFish();
    const sportFishItemsArr: ICommonFishProduct[] =
      await sportFishClass.scrapeResults(searchTerm);
    const allItems: ICommonFishProduct[] =
      fishDealItemsArr.concat(sportFishItemsArr);
    return allItems;
  }
}
export default AllItemShops;
