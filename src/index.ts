import { SportFish } from "./FishStoreClassLib/AnglingDirectClass";
import { FishDeal } from "./FishStoreClassLib/FishDealClass";
const main = async (): Promise<void> => {
  //const fishDeal = new FishDeal();
  //const fishDealItems = await fishDeal.scrapeResults("shark shad");
  //console.log(fishDealItems);
  const anglingDirect = new SportFish();
  await anglingDirect.scrapeResults("spinner");
};
main();
