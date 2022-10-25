import { SportFish } from "./FishStoreClassLib/SportFishClass";
import { FishDeal } from "./FishStoreClassLib/FishDealClass";
import AllItemShops from "./FishStoreClassLib/AllShopsClass";
const main = async (): Promise<void> => {
  /*const fishDeal = new FishDeal();
  const fishDealItems = await fishDeal.scrapeResults("shark shad");
  console.log(fishDealItems);
  const anglingDirect = new SportFish();
  console.log(await anglingDirect.scrapeResults("spinner"));
  */
  const allItemObj = new AllItemShops();
  console.log(await allItemObj.getAllItems("sal"));
};
main();
