import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./Shared.css";

import Home from "./Pages/Home";
import Compose from "./Pages/Compose";
import Shop from "./Pages/Shop";
import Settings from "./Pages/Settings";

const App = () => {
 const [lowVisionOn, setLowVision] = useState(true);

 const handleLowVisionSwitch = () => {
  const rootElement = document.getElementsByTagName("html")[0];
  setLowVision(isOn => {
   isOn
    ? (rootElement.style.fontSize = "12pt")
    : (rootElement.style.fontSize = "42pt");
   return !isOn;
  });
 };

 return (
  <>
   {/* <nav>Menu</nav> */}
   <Router>
    <Routes>
     <Route
      exact
      path="/"
      element={<Home lowVisionOn={lowVisionOn} />}
     />
     <Route
      exact
      path="/compose/"
      element={<Compose lowVisionOn={lowVisionOn} />}
     />
     <Route
      exact
      path="/shop/"
      element={<Shop lowVisionOn={lowVisionOn} />}
     />
     <Route
      exact
      path="/settings/"
      element={
       <Settings
        lowVisionOn={lowVisionOn}
        lowVisionCallback={() => handleLowVisionSwitch()}
       />
      }
     />
    </Routes>
   </Router>
  </>
 );
};

export default App;
