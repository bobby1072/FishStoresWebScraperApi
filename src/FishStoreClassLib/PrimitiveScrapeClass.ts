import ICommonFishProduct from "./ICommonStoreItemData";
abstract class PrimitiveScrapeClass {
  protected sortResults(
    searchTerm: string,
    results: ICommonFishProduct[]
  ): ICommonFishProduct[] {
    const searchTermArray = searchTerm.split(" ");
    return results.sort((a: ICommonFishProduct, b: ICommonFishProduct) => {
      if (
        (a.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !b.Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (a.Brand?.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !b.Brand?.toLowerCase().includes(searchTerm.toLowerCase()))
      ) {
        return -1;
      } else if (
        (!a.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          b.Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (!a.Brand?.toLowerCase().includes(searchTerm.toLowerCase()) &&
          b.Brand?.toLowerCase().includes(searchTerm.toLowerCase()))
      ) {
        return 1;
      } else {
        const findTermA = searchTermArray.find((element) => {
          return a.Name.toLowerCase().includes(element.toLowerCase());
        });
        if (findTermA) {
          return -1;
        }
        const findTermB = searchTermArray.find((element) => {
          return b.Name.toLowerCase().includes(element.toLowerCase());
        });
        if (findTermB) {
          return 1;
        }
        return 0;
      }
    });
  }
}
export default PrimitiveScrapeClass;
