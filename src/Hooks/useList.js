import { useCallback, useState } from "react";
import Axios from "axios";

const useList = variant => {
 const [products, setProducts] = useState();
 const [searchPhrase, setSearchPhrase] = useState(null);
 const [dropdowns, setDropdowns] = useState();

 const stateSwitch = variant === "shop" ? "inCart" : "onList";

 const sorter = useCallback(
  (a, b) => {
   if (a[stateSwitch] && !b[stateSwitch]) return 1;
   if (!a[stateSwitch] && b[stateSwitch]) return -1;
   if (a.name > b.name) return 1;
   if (a.name < b.name) return -1;
   return 0;
  },
  [stateSwitch]
 );

 const onFetched = useCallback(
  data => {
   Object.values(data).forEach(category => {
    category.sort((a, b) => sorter(a, b));
   });
   setProducts(data);
   const dropdownsObj = {};
   Object.keys(data).forEach(category => (dropdownsObj[category] = false));
   setDropdowns(dropdownsObj);
  },
  [sorter]
 );

 const flattenedList = () => {
  const result = [];
  Object.values(products).forEach(category => result.push(...category));
  result.sort((a, b) => {
   if (a.name > b.name) return 1;
   if (a.name < b.name) return -1;
   return 0;
  });
  return result;
 };

 const selectionHandle = productName => {
  const selectedProduct = flattenedList().filter(
   product => product.name === productName
  )[0];

  Axios.post(
   `${process.env.REACT_APP_BACKEND_URL}/products/updateOne/${variant}`,
   {
    name: selectedProduct.name,
    [stateSwitch]: !selectedProduct[stateSwitch],
   }
  ).catch(error => console.log(error));

  setProducts(current => {
   const mutableArray = current[selectedProduct.category];
   const index = mutableArray.indexOf(selectedProduct);
   mutableArray[index][stateSwitch] = !mutableArray[index][stateSwitch];
   mutableArray.sort((a, b) => sorter(a, b));
   return { ...current, [selectedProduct.category]: mutableArray };
  });
 };

 const allInCart = category => {
  return products[category].filter(product => !product.inCart).length === 0;
 };

 const categoriesProvider = () => {
  if (variant === "compose") {
   return Object.keys(products);
  }

  if (variant === "shop") {
   return Object.keys(products).sort((a, b) => {
    if (allInCart(a) && !allInCart(b)) return 1;
    if (!allInCart(a) && allInCart(b)) return -1;
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
   });
  }
 };

 const searchResult = () => {
  return flattenedList(products).filter(product =>
   product.name.toLowerCase().includes(searchPhrase.toLowerCase())
  );
 };

 const finalizeList = ommitNotInCart => {
  return new Promise((resolve, reject) => {
   let itemsToOmmit = [];

   if (ommitNotInCart) {
    itemsToOmmit = flattenedList()
     .filter(product => !product.inCart)
     .map(product => product.name);
   }

   Axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/products/finalizeList`,
    itemsToOmmit
   ).then(() => resolve());
  });
 };

 return {
  products: products,
  searchPhrase: searchPhrase,
  setSearchPhrase: setSearchPhrase,
  dropdowns: dropdowns,
  setDropdowns: setDropdowns,
  onFetched: onFetched,
  selectionHandle: selectionHandle,
  categoriesProvider: categoriesProvider,
  allInCart: allInCart,
  stateSwitch: stateSwitch,
  searchResult: searchResult,
  finalizeList: finalizeList,
 };
};

export default useList;
