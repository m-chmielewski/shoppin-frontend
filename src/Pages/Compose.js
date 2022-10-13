import React, { useState, useEffect } from "react";
import Axios from "axios";

import "./Compose.css";

const Compose = () => {
 const [state, setState] = useState();

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

 const switchColumns = (category, index, target) => {
  const source = target === "leftColumn" ? "rightColumn" : "leftColumn";
  setState(current => {
   const mutableSourceArray = current[source].products[category].slice();
   const mutableTargetArray =
    current[target]?.products?.[category]?.slice() ?? [];
   const selectedProduct = mutableSourceArray.splice(index, 1);
   mutableTargetArray.push(selectedProduct[0]);
   return {
    ...current,
    [source]: {
     ...current[source],
     products: {
      ...current[source].products,
      [category]: mutableSourceArray,
     },
    },
    [target]: {
     ...current[target],
     products: {
      ...current[target]?.products,
      [category]: mutableTargetArray,
     },
    },
   };
  });
 };

 if (!state) return <div>Loading...</div>;

 return (
  <div className="compose">
   {/* <button>Expand/collapse all categpries</button> */}
   <ul>
    <h2>
     Products <button>&#43;</button>
    </h2>
    {Object.keys(state.leftColumn.products).map(category => {
     if (state.leftColumn.products[category].length === 0) return null;
     else
      return (
       <li key={category}>
        <button
         onClick={() =>
          setState(current => {
           return {
            ...current,
            leftColumn: {
             ...current.leftColumn,
             dropdowns: {
              ...current.leftColumn.dropdowns,
              [category]: !current.leftColumn.dropdowns?.[category],
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
            state.leftColumn.dropdowns?.[category] ? "up" : "down"
           }`}
          ></i>
         </h3>
        </button>
        <ul
         style={
          state.leftColumn.dropdowns?.[category]
           ? { display: "flex" }
           : { display: "none" }
         }
        >
         {state.leftColumn.products[category].map((product, index) => (
          <li key={product._id}>
           {product.name}
           <button
            className="btn add"
            onClick={() => switchColumns(category, index, "rightColumn")}
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
    {!state.rightColumn?.products
     ? null
     : Object.keys(state.rightColumn?.products).map(category => {
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
             <li key={product._id}>
              {product.name}
              <button
               className="btn remove"
               onClick={() => switchColumns(category, index, "leftColumn")}
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
