import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./Shared.css";

import Home from "./Pages/Home";
import Compose from "./Pages/Compose";
import Shop from "./Pages/Shop";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/compose/" element={<Compose />} />
        <Route exact path="/shop/" element={<Shop />} />
      </Routes>
    </Router>
  );
};

export default App;
