import React from "react";

import "./Alert.css";

const Alert = ({ cancellationCallback }) => {
 return (
  <div className="alert">
   <div>
    <h2>Adding new product</h2>
    <input
     type="text"
     placeholder="Name"
    ></input>
    <input
     type="text"
     placeholder="Category"
    ></input>
    <div className="btns-section">
     <button
      className="cancel"
      onClick={() => cancellationCallback()}
     >
      Cancel
     </button>
     <button className="submit">Submit</button>
    </div>
   </div>
  </div>
 );
};

export default Alert;
