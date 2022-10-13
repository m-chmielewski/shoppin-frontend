import React from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";

const Home = () => {
 const navigateTo = useNavigate();

 return (
  <ul className="home">
   <h1>Shoppin</h1>
   <li>
    <button onClick={() => navigateTo("/compose/")}>Compose</button>
   </li>
   <li>
    <button onClick={() => navigateTo("/shop/")}>Shop</button>
   </li>
  </ul>
 );
};

export default Home;
