import React from "react";

import "./Settings.css";

const Settings = ({ lowVisionCallback, lowVisionOn }) => {
 return (
  <div
   className={`content-wrapper settings ${lowVisionOn ? "low-vision" : ""}`}
  >
   <div className={`card ${lowVisionOn ? "low-vision" : ""}`}>
    <span>Low vision mode</span>
    <button
     className={`btn ${lowVisionOn ? "off" : "on"}`}
     onClick={() => lowVisionCallback()}
    >
     Turn {lowVisionOn ? "off" : "on"}
    </button>
   </div>
  </div>
 );
};

export default Settings;
