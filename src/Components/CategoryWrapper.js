import React, { useState } from "react";

import "./CategoryWrapper.css";

import { Arrow } from "@mchm/common";

const CategoryWrapper = ({ category, ...props }) => {
 const [expanded, setExpanded] = useState(false);

 return (
  <li className="category-wrapper">
   <div
    className="heading"
    onClick={() => {
     setExpanded(current => !current);
    }}
    tabIndex={0}
   >
    {category}
    {expanded ? <Arrow up /> : <Arrow down />}
   </div>
   <ul style={{ display: expanded ? "flex" : "none" }}>{props.children}</ul>
  </li>
 );
};

export default CategoryWrapper;
