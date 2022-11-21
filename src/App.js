import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./Shared.css";

import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import Compose from "./Pages/Compose";
import Shop from "./Pages/Shop";
import ManageProducts from "./Pages/ManageProducts";
import AddProduct from "./Pages/AddProduct";
import EditProduct from "./Pages/EditProduct";
import Settings from "./Pages/Settings";

const App = () => {
 const [lowVisionOn, setLowVision] = useState(true);
 const [token, setToken] = useState(localStorage.getItem("token"));

 const saveToken = token => {
  localStorage.setItem("token", token);
  setToken(token);
 };

 const handleLowVisionSwitch = () => {
  const rootElement = document.getElementsByTagName("html")[0];
  lowVisionOn
   ? (rootElement.style.fontSize = "12pt")
   : (rootElement.style.fontSize = "42pt");
  setLowVision(!lowVisionOn);
 };

 // if (!token)
 //  return (
 //   <SignIn
 //    setToken={saveToken}
 //    lowVisionOn={lowVisionOn}
 //   />
 //  );

 return (
  <>
   {/* <nav>Menu</nav> */}
   <Router>
    <Routes>
     <Route
      path="/"
      element={<Home lowVisionOn={lowVisionOn} />}
     />
     <Route
      path="/signIn/"
      element={<SignIn lowVisionOn={lowVisionOn} />}
     />
     <Route
      path="/compose/"
      element={<Compose lowVisionOn={lowVisionOn} />}
     />
     <Route
      path="/shop/"
      element={<Shop lowVisionOn={lowVisionOn} />}
     />
     <Route
      path="/manageProducts/"
      element={<ManageProducts lowVisionOn={lowVisionOn} />}
     />
     <Route
      path="/manageProducts/add/"
      element={<AddProduct lowVisionOn={lowVisionOn} />}
     />
     <Route
      path="/manageProducts/edit/"
      element={<EditProduct lowVisionOn={lowVisionOn} />}
     />
     <Route
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
