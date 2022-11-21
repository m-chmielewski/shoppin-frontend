import React, { useState, useEffect } from "react";
import Axios from "axios";

import hamburgerIcon from "../Icons/hamburger.svg";
import closeIcon from "../Icons/close.svg";

import { Button, Card, CategoryWrapper, PageContent } from "@mchm/common";

import "./Compose.css";

const Compose = () => {
 const [products, setProducts] = useState();
 const [productsToAdd, setProductsToAdd] = useState();
 const [productsOnList, setProductsOnList] = useState();
 const [dropdowns, setDropdowns] = useState({ toAdd: {}, onList: {} });
 const [menuOpened, setMenuOpened] = useState(false);

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

 const handleCollapseExpandAll = expandOrCollapse => {
  let expand;

  switch (expandOrCollapse) {
   case "expand":
    expand = true;
    break;
   case "collapse":
    expand = false;
    break;
   default:
    expand = false;
  }

  setDropdowns(() => {
   const categories = [...new Set(products.map(product => product.category))];
   const newValues = { onList: {}, toAdd: {} };
   categories.forEach(category => {
    newValues.onList[category] = expand;
    newValues.toAdd[category] = expand;
   });
   return newValues;
  });
 };

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
  <PageContent>
   <h1>Compose</h1>
   {/* <div className="toolbar">
    <div className="top-section">
     <button>Back</button>
     <button
      className="hamburger-btn"
      onClick={() => {
       setMenuOpened(current => !current);
      }}
     >
      <img
       src={menuOpened ? closeIcon : hamburgerIcon}
       alt="Menu icon"
      ></img>
     </button>
    </div>
    <ul style={{ display: menuOpened ? "flex" : "none" }}>
     <li>
      <button>Search</button>
     </li>
     <li>
      <button onClick={() => handleCollapseExpandAll("expand")}>
       Expand all
      </button>
     </li>
     <li>
      <button onClick={() => handleCollapseExpandAll("collapse")}>
       Collapse all
      </button>
     </li>
    </ul>
   </div> */}
   <div
    style={{
     display: "flex",
     gap: "var(--regular-vision-gap)",
     flexWrap: "wrap",
    }}
   >
    <ul style={{ flex: "1" }}>
     <h2>Products</h2>
     {Object.keys(productsToAdd).map(category => {
      if (productsToAdd[category].length === 0) return null;
      else
       return (
        <CategoryWrapper
         key={category}
         category={category}
        >
         {productsToAdd[category].map(product => (
          <li key={product._id}>
           <Card>
            <span>{product.name}</span>
            <Button
             variant="positive"
             onClick={() => switchProductStatus(product)}
            >
             Add
            </Button>
           </Card>
          </li>
         ))}
        </CategoryWrapper>
       );
     })}
    </ul>
    <ul style={{ flex: "1" }}>
     <h2>List</h2>
     {Object.keys(productsOnList).map(category => {
      if (productsOnList[category].length === 0) return null;
      else
       return (
        <CategoryWrapper
         key={category}
         category={category}
        >
         {productsOnList[category].map(product => (
          <li key={product._id}>
           <Card>
            <span>{product.name}</span>
            <Button
             variant="negative"
             onClick={() => switchProductStatus(product)}
            >
             Remove
            </Button>
           </Card>
          </li>
         ))}
        </CategoryWrapper>
       );
     })}
    </ul>
   </div>
  </PageContent>
 );
};

export default Compose;
