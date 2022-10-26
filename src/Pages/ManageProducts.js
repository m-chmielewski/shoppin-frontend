import React from "react";
import { useNavigate } from "react-router-dom";

import "./ManageProducts.css";

const ManageProducts = ({ lowVisionOn }) => {
 const navigateTo = useNavigate();

 return (
  <div className={`content-wrapper menu ${lowVisionOn ? "low-vision" : ""}`}>
   <button onClick={() => navigateTo("/manageProducts/add/")}>
    <span>Add</span>
    <div className="arrow right"></div>
   </button>
   <button onClick={() => navigateTo("/manageProducts/edit/")}>
    <span>Edit</span>
    <div className="arrow right"></div>
   </button>
  </div>
 );
};

export default ManageProducts;
