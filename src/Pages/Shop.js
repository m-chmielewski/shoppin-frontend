import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import "./Shop.css";

const Shop = ({ lowVisionOn }) => {
 const [products, setProducts] = useState();
 const [productsOnList, setProductsOnList] = useState();
 const [dropdowns, setDropdowns] = useState({});

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
   <div className={`content-wrapper shop ${lowVisionOn ? "low-vision" : ""}`}>
    <ul>
     <h2>Shop</h2>
     <li>
      <h3>No items added yet</h3>
      <ul>
       <li>
        <button onClick={() => navigateTo("/compose")}>Compose list</button>
       </li>
      </ul>
     </li>
    </ul>
   </div>
  );
 }

 return (
  <div className={`content-wrapper shop ${lowVisionOn ? "low-vision" : ""}`}>
   <ul>
    <h2>
     Shop
     <button
      className="btn done"
      onClick={listDone}
     >
      Done
     </button>
    </h2>
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
            [category]: !current[category],
           };
          })
         }
        >
         <h3>
          {category}
          <i className={`arrow ${dropdowns[category] ? "up" : "down"}`}></i>
         </h3>
        </button>
        <ul
         style={dropdowns[category] ? { display: "flex" } : { display: "none" }}
        >
         {productsOnList[category].map(product => (
          <li
           className={`${lowVisionOn ? "low-vision" : ""}`}
           key={product._id}
          >
           <span
            style={{
             textDecorationLine: product.inCart ? "line-through" : "none",
            }}
           >
            {product.name}
           </span>
           <button
            className={`btn ${product.inCart ? "remove" : "add"}`}
            onClick={() => switchProductStatus(product)}
           >
            {product.inCart ? "Not in cart" : "In cart"}
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

export default Shop;
