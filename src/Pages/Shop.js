import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import "./Shop.css";

import { Button, Card, CategoryWrapper, PageContent } from "@mchm/common";

const Shop = () => {
 const [products, setProducts] = useState();
 const [productsOnList, setProductsOnList] = useState();

 const navigateTo = useNavigate();

 useEffect(() => {
  Axios.get(`${process.env.REACT_APP_BACKEND_URL}/list/`).then(response => {
   setProducts(Array(...response.data));
  });
 }, []);

 useEffect(() => {
  if (products) {
   const tempProductsOnList = {};
   products.forEach(product => {
    if (product.onList) {
     tempProductsOnList[product.category]
      ? tempProductsOnList[product.category].push(product)
      : (tempProductsOnList[product.category] = [product]);
    }
   });
   setProductsOnList(tempProductsOnList);
  }
 }, [products]);

 useEffect(() => {
  if (products) {
   Axios.post(`${process.env.REACT_APP_BACKEND_URL}/list/`, products).catch(
    error => console.log(error)
   );
  }
 }, [products]);

 const switchProductStatus = product => {
  setProducts(current => {
   const mutable = [...current];
   const productToChange = mutable.find(
    element => element.name === product.name
   );
   productToChange.inCart = !productToChange.inCart;
   return mutable;
  });
 };

 const listDone = () => {
  if (!window.confirm("Are you sure?")) return;
  Axios.post(`${process.env.REACT_APP_BACKEND_URL}/list/finalize`)
   .then(result => navigateTo("/"))
   .catch(error => console.log(error));
 };

 if (!productsOnList) return <div>Loading...</div>;

 if (Object.keys(productsOnList).length === 0) {
  return (
   <PageContent className="shop">
    <h1>Shop</h1>
    No items added yet
    <Button href="/compose">Compose list</Button>
   </PageContent>
  );
 }

 return (
  <PageContent className="shop">
   <h1>Shop</h1>
   <Button
    onClick={listDone}
    variant="neutral"
   >
    Done
   </Button>
   <ul>
    {Object.keys(productsOnList).map(category => {
     if (productsOnList[category].length === 0) {
      return null;
     } else {
      return (
       <CategoryWrapper
        key={category}
        category={category}
       >
        {productsOnList[category].map(product => (
         <li key={product._id}>
          <Card>
           <span
            style={{
             textDecorationLine: product.inCart ? "line-through" : "none",
            }}
           >
            {product.name}
           </span>
           <Button
            variant={`${product.inCart ? "negative" : "positive"}`}
            onClick={() => switchProductStatus(product)}
           >
            {product.inCart ? "Not in cart" : "In cart"}
           </Button>
          </Card>
         </li>
        ))}
       </CategoryWrapper>
      );
     }
    })}
   </ul>
  </PageContent>
 );
};

export default Shop;
