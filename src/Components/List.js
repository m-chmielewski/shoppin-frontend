import React, { useState, useCallback } from "react";
import Axios from "axios";

import { CategoryWrapper, Fetcher, SelectableCard } from "@mchm/common";

import { productsHandle } from "../Utils/productsHandle";

import useList from "../Hooks/useList";

const List = props => {
 const { products, setProducts } = useList();

 let stateSwitch;

 if (props.variant === "compose") {
  stateSwitch = "onList";
 } else if (props.variant === "shop") {
  stateSwitch = "inCart";
 } else {
  throw new Error("Provide valid List.variant");
 }

 //  const [products, setProducts] = useState();

 const onFetched = useCallback(
  data => {
   Object.values(data).forEach(category => {
    category.sort((a, b) => productsHandle.sorter(a, b, stateSwitch));
   });
   setProducts(data);
  },
  [stateSwitch, setProducts]
 );

 const selectionHandle = productName => {
  const selectedProduct = productsHandle
   .flattenedList(products)
   .filter(product => product.name === productName)[0];

  Axios.post(
   `${process.env.REACT_APP_BACKEND_URL}/products/updateOne/${props.variant}`,
   {
    name: selectedProduct.name,
    [stateSwitch]: !selectedProduct[stateSwitch],
   }
  ).catch(error => console.log(error));

  setProducts(current => {
   const mutableArray = current[selectedProduct.category];
   const index = mutableArray.indexOf(selectedProduct);
   mutableArray[index][stateSwitch] = !mutableArray[index][stateSwitch];
   mutableArray.sort((a, b) => productsHandle.sorter(a, b, stateSwitch));
   return { ...current, [selectedProduct.category]: mutableArray };
  });
 };

 return (
  <>
   <Fetcher
    url={`${process.env.REACT_APP_BACKEND_URL}/products/forList/${props.variant}`}
    onFetched={onFetched}
    dataName="list"
   />
   {products && props.searchPhrase === null && (
    <ul>
     {productsHandle
      .categoriesProvider(products, props.variant)
      .map(category => (
       <CategoryWrapper
        category={category}
        key={category}
        crossedOut={
         props.variant === "shop"
          ? productsHandle.allInCart(products, category)
          : false
        }
       >
        {products[category].map((product, index) => {
         return (
          <SelectableCard
           key={product.name}
           onClick={() => selectionHandle(product.name)}
           selected={product[stateSwitch]}
          >
           {product.name}
          </SelectableCard>
         );
        })}
       </CategoryWrapper>
      ))}
    </ul>
   )}
   {products && props.searchPhrase && (
    <ul>
     {productsHandle.searchResult(products, props.searchPhrase).map(product => (
      <SelectableCard
       key={product.name}
       onClick={() => selectionHandle(product.name)}
       selected={product[stateSwitch]}
      >
       {product.name}
      </SelectableCard>
     ))}
    </ul>
   )}
  </>
 );
};

export default List;
