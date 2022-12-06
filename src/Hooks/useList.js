import { useState } from "react";

const useList = () => {
 const [products, setProducts] = useState();

 const flattenedList = () => {
  //Can I use products.flat()?
  console.log(products.flat());
  const result = [];
  Object.values(products).forEach(category => result.push(...category));
  result.sort((a, b) => {
   if (a.name > b.name) return 1;
   if (a.name < b.name) return -1;
   return 0;
  });
  return result;
 };

 return {
  setProducts: setProducts,
  products: products,
 };
};

export default useList;
