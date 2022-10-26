const cors = require("cors");
import AllItemShops from "./FishStoreClassLib/AllShopsClass";
import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import ICommonFishProduct from "./FishStoreClassLib/ICommonStoreItemData";
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
const app: Application = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get(
  "/allproductsearch/",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const prodSearchName = req.query.searchterm;
      if (
        typeof prodSearchName === "string" &&
        /^[A-Za-z\s]*$/.test(prodSearchName)
      ) {
        const allItemsClass: AllItemShops = new AllItemShops();
        const allSearchItems: ICommonFishProduct[] =
          await allItemsClass.getAllItems(prodSearchName);
        res.status(200);
        res.json(allSearchItems);
      } else {
        res.status(400);
        res.send("Possibly inncorrect URL argument given");
      }
    } catch (error) {
      res.status(500);
      res.send("Internal server error occured");
    }
  }
);

const portVar: string | number = process.env.PORT || 5000;
app.listen(portVar, () =>
  console.log(`\n\nServer running on port: ${portVar}\n\n`)
);
