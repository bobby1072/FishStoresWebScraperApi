import cors from "cors";
import AllItemShops from "./FishStoreClassLib/AllShopsClass";
import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import ICommonFishProduct from "./FishStoreClassLib/ICommonStoreItemData";
import FishDeal from "./FishStoreClassLib/FishDealClass";
import SportFish from "./FishStoreClassLib/SportFishClass";
import TotalFishing from "./FishStoreClassLib/TotalFishingClass";
function main(): void {
  const app: Application = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.get(
    "/sportfishproductsearch/",
    async (req: Request, res: Response): Promise<void> => {
      try {
        const prodSearchName = req.query.searchterm;
        if (
          typeof prodSearchName === "string" &&
          /^[A-Za-z\s]*$/.test(prodSearchName)
        ) {
          const sportFishItems: ICommonFishProduct[] =
            await new SportFish().scrapeResults(prodSearchName);
          res.status(200);
          res.json(sportFishItems);
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
  app.get(
    "/totalfishingproductsearch",
    async (req: Request, res: Response): Promise<void> => {
      try {
        const prodSearchName = req.query.searchterm;
        if (
          typeof prodSearchName === "string" &&
          /^[A-Za-z\s]*$/.test(prodSearchName)
        ) {
          const totalFishingItems: ICommonFishProduct[] =
            await new TotalFishing().scrapeResults(prodSearchName);
          res.status(200);
          res.json(totalFishingItems);
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
  app.get(
    "/fishdealproductsearch/",
    async (req: Request, res: Response): Promise<void> => {
      try {
        const prodSearchName = req.query.searchterm;
        if (
          typeof prodSearchName === "string" &&
          /^[A-Za-z\s]*$/.test(prodSearchName)
        ) {
          const fishDealItems: ICommonFishProduct[] =
            await new FishDeal().scrapeResults(prodSearchName);
          res.status(200);
          res.json(fishDealItems);
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

  app.get(
    "/allproductsearch/",
    async (req: Request, res: Response): Promise<void> => {
      try {
        const prodSearchName = req.query.searchterm;
        if (
          typeof prodSearchName === "string" &&
          /^[A-Za-z\s]*$/.test(prodSearchName)
        ) {
          const allSearchItems: ICommonFishProduct[] =
            await new AllItemShops().getAllItems(prodSearchName);
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
}
main();
