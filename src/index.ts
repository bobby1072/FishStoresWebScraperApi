import { FishDeal } from "./FishStoreClassLib/FishDealClass";
const main = async (): Promise<void> => {
  const fishDeal = new FishDeal();
  const fishDealItems = await fishDeal.scrapeResults("shark shad");
  console.log(fishDealItems);
};
main();
