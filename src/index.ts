import { FishDeal } from "./FishStoreClassLib/FishDealClass";
const main = async (): Promise<void> => {
  const fishDeal = new FishDeal();
  const fishDealItems = await fishDeal.scrapeResults("spinner");
  console.log(fishDealItems);
};
main();
