/*const fizzBuzzCheck = (num: number): string | number => {
  if (num % 3 === 0 || num % 5 === 0) {
    let foiz = "";
    if (num % 3 === 0) {
      foiz = "fizz ";
    }
    if (num % 5 === 0) {
      foiz = foiz + "buzz";
    }
    return foiz;
  } else {
    return num;
  }
};
function main(): void {
  for (let i = 1; i < 50; i++) {
    console.log(fizzBuzzCheck(i));
  }
}*/

import { FishDeal } from "./FishClassesLib";

const main = async (): Promise<void> => {
  const fishDeal = new FishDeal();
  await fishDeal.scrapeResults("sal");
};
main();
