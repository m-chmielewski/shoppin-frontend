import React from "react";

import "./SearchBox.css";

const SearchBox = props => {
 if (!props.onChange) {
  throw new Error("Provide SearchBox.searchPhraseChange");
 }

 return (
  <>
   <div className="searchbox-wrapper">
    <input
     type="text"
     placeholder={props.placeholder || ""}
     onChange={event => props.onChange(event.target.value)}
    />
   </div>
  </>
 );
};

export default SearchBox;
