import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./Pages/MediaQueries.css";

import { useRegularVision } from "@mchm/common";
import { StylingProvider } from "@mchm/common";

import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import Compose from "./Pages/Compose";
import Shop from "./Pages/Shop";
import AddProduct from "./Pages/AddProduct";
import Settings from "./Pages/Settings";

const App = () => {
 const [regularVisionOn, regularVisionSwitch] = useRegularVision();
 const [token, setToken] = useState(localStorage.getItem("token"));

 const saveToken = token => {
  localStorage.setItem("token", token);
  setToken(token);
 };

 // if (!token)
 //  return (
 //   <SignIn
 //    setToken={saveToken}
 //    lowVisionOn={lowVisionOn}
 //   />
 //  );

 return (
  <StylingProvider regularVisionOn={regularVisionOn}>
   {/* <nav>Menu</nav> */}
   <Router>
    <Routes>
     <Route
      path="/"
      element={<Home />}
     />
     <Route
      path="/signIn/"
      element={<SignIn />}
     />
     <Route
      path="/compose/"
      element={<Compose />}
     />
     <Route
      path="/shop/"
      element={<Shop />}
     />
     <Route
      path="/addProduct/"
      element={<AddProduct />}
     />
     <Route
      path="/settings/"
      element={
       <Settings
        regularVisionSwitch={regularVisionSwitch}
        regularVisionOn={regularVisionOn}
       />
      }
     />
    </Routes>
   </Router>
  </StylingProvider>
 );
};

export default App;
