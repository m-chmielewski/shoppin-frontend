import React from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";

const Home = ({ lowVisionOn }) => {
 const navigateTo = useNavigate();

 return (
  <div className={`content-wrapper menu ${lowVisionOn ? "low-vision" : ""}`}>
   <button onClick={() => navigateTo("/compose/")}>
    <span>Compose</span>
    <div className="arrow right"></div>
   </button>
   <button onClick={() => navigateTo("/shop/")}>
    <span>Shop</span>
    <div className="arrow right"></div>
   </button>
   <button onClick={() => navigateTo("/manageProducts/")}>
    <span>Manage products</span>
    <div className="arrow right"></div>
   </button>
   <button onClick={() => navigateTo("/settings/")}>
    <span>Settings</span>
    <div className="arrow right"></div>
   </button>
  </div>
 );
};

export default Home;
