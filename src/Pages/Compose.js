import React, { useState, useEffect } from "react";
import Axios from "axios";

import "./Compose.css";

const Compose = ({ lowVisionOn }) => {
 const [products, setProducts] = useState();
 const [productsToAdd, setProductsToAdd] = useState();
 const [productsOnList, setProductsOnList] = useState();
 const [dropdowns, setDropdowns] = useState({ toAdd: {}, onList: {} }); // products and list

 useEffect(() => {
  Axios.get(`${process.env.REACT_APP_BACKEND_URL}/list/`)
   .then(response => {
    setProducts(Array(...response.data));
   })
   .catch(error => {
    console.log(error);
   });
 }, []);

 useEffect(() => {
  if (products) {
   Axios.post(`${process.env.REACT_APP_BACKEND_URL}/list/`, products).catch(
    error => console.log(error)
   );
  }
 }, [products]);

 useEffect(() => {
  if (products) {
   const tempToAdd = {};
   const tempOnList = {};
   products.forEach(product => {
    if (!product.onList) {
     tempToAdd[product.category]
      ? tempToAdd[product.category].push(product)
      : (tempToAdd[product.category] = [product]);
    } else {
     tempOnList[product.category]
      ? tempOnList[product.category].push(product)
      : (tempOnList[product.category] = [product]);
    }
   });
   setProductsOnList(tempOnList);
   setProductsToAdd(tempToAdd);
  }
 }, [products]);

 const switchProductStatus = product => {
  setProducts(current => {
   const mutable = [...current];
   const productToChange = mutable.find(
    element => element.name === product.name
   );
   if (productToChange.onList) productToChange.inCart = false;
   productToChange.onList = !productToChange.onList;
   return mutable;
  });
 };

 if (!productsToAdd || !productsOnList) {
  return <div> Loading...</div>;
 }

 return (
  <div className={`content-wrapper compose ${lowVisionOn ? "low-vision" : ""}`}>
   {/* <button>Expand/collapse all categpries</button> */}
   <ul>
    <h2>Products</h2>
    {Object.keys(productsToAdd).map(category => {
     if (productsToAdd[category].length === 0) return null;
     else
      return (
       <li key={category}>
        <button
         onClick={() =>
          setDropdowns(current => {
           return {
            ...current,
            toAdd: {
             ...current.toAdd,
             [category]: !current.toAdd[category],
            },
           };
          })
         }
        >
         <h3>
          {category}
          <i
           className={`arrow ${dropdowns.toAdd[category] ? "up" : "down"}`}
          ></i>
         </h3>
        </button>
        <ul
         style={
          dropdowns.toAdd[category] ? { display: "flex" } : { display: "none" }
         }
        >
         {productsToAdd[category].map(product => (
          <li
           className={lowVisionOn ? "low-vision" : ""}
           key={product._id}
          >
           <div>{product.name}</div>
           <button
            className="btn add"
            onClick={() => switchProductStatus(product)}
           >
            Add
           </button>
          </li>
         ))}
        </ul>
       </li>
      );
    })}
   </ul>
   <ul>
    <h2>List</h2>
    {Object.keys(productsOnList).map(category => {
     if (productsOnList[category].length === 0) return null;
     else
      return (
       <li key={category}>
        <button
         onClick={() =>
          setDropdowns(current => {
           return {
            ...current,
            onList: {
             ...current.onList,
             [category]: !current.onList[category],
            },
           };
          })
         }
        >
         <h3>
          {category}
          <i
           className={`arrow ${dropdowns?.onList?.[category] ? "up" : "down"}`}
          ></i>
         </h3>
        </button>
        <ul
         style={
          dropdowns?.onList?.[category]
           ? { display: "flex" }
           : { display: "none" }
         }
        >
         {productsOnList[category].map((product, index) => (
          <li
           className={lowVisionOn ? "low-vision" : ""}
           key={product._id}
          >
           {product.name}
           <button
            className="btn remove"
            onClick={() => switchProductStatus(product)}
           >
            Remove
           </button>
          </li>
         ))}
        </ul>
       </li>
      );
    })}
   </ul>
  </div>
 );
};

export default Compose;
