import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import "./Shop.css";

const Shop = ({ lowVisionOn }) => {
 const [state, setState] = useState();

 const navigateTo = useNavigate();

 useEffect(() => {
  Axios.get(`${process.env.REACT_APP_BACKEND_URL}/list/`).then(response => {
   setState(current => ({
    ...current,
    ...response.data,
   }));
  });
 }, []);

 useEffect(() => {
  if (state) {
   Axios.post(`${process.env.REACT_APP_BACKEND_URL}/list/`, state);
  }
 }, [state]);

 useEffect(() => {
  if (state?.current === false) navigateTo("/");
 }, [state?.current]);

 const changeStatus = (category, index) => {
  setState(current => {
   const mutableArray = current.rightColumn.products[category].slice();
   mutableArray[index].inCart = !mutableArray[index].inCart;
   return {
    ...current,
    rightColumn: {
     ...current.rightColumn,
     products: {
      ...current.rightColumn.products,
      [category]: mutableArray,
     },
    },
   };
  });
 };

 const listDone = () => {
  setState(current => {
   return {
    ...current,
    current: false,
   };
  });
 };

 if (!state) return <div>Loading...</div>;

 if (!state.rightColumn) {
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
    {/* <h2>
     Shop
     <button
      className="btn done"
      onClick={() => listDone()}
     >
      Done
     </button>
    </h2> */}
    {Object.keys(state.rightColumn.products).map(category => {
     if (state.rightColumn.products[category].length === 0) return null;
     else
      return (
       <li key={category}>
        <button
         onClick={() =>
          setState(current => {
           return {
            ...current,
            rightColumn: {
             ...current.rightColumn,
             dropdowns: {
              ...current.rightColumn.dropdowns,
              [category]: !current.rightColumn.dropdowns?.[category],
             },
            },
           };
          })
         }
        >
         <h3>
          {category}
          <i
           className={`arrow ${
            state.rightColumn.dropdowns?.[category] ? "up" : "down"
           }`}
          ></i>
         </h3>
        </button>
        <ul
         style={
          state.rightColumn.dropdowns?.[category]
           ? { display: "flex" }
           : { display: "none" }
         }
        >
         {state.rightColumn.products[category].map((product, index) => (
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
            onClick={() => changeStatus(category, index)}
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
