import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import "./AddProduct.css";

const AddProduct = ({ lowVisionOn }) => {
 const [state, setState] = useState();

 const navigateTo = useNavigate();

 useEffect(() => {
  Axios.get(`${process.env.REACT_APP_BACKEND_URL}/categories/`)
   .then(response => {
    setState(current => ({
     ...current,
     categories: response.data,
    }));
   })
   .catch(error => {
    console.log(error);
   });
 }, []);

 const handleSubmit = () => {
  setState(current => {
   return {
    ...current,
    submitting: true,
    valuesMissing: !state?.name || !state?.pickedCategory ? true : false,
   };
  });

  if (state?.name && state?.pickedCategory) {
   Axios.post(`${process.env.REACT_APP_BACKEND_URL}/products/`, {
    name: state.name,
    category: state.pickedCategory,
   }).then(result => {
    if (result.status === 200) {
     setState(current => {
      return {
       ...current,
       submittedSuccessfully: true,
      };
     });

     setTimeout(() => {
      setState(current => {
       return {
        ...current,
        submitting: false,
        submittedSuccessfully: null,
        name: "",
       };
      });
     }, 2000);
    }
   });
  } else {
   setTimeout(() => {
    setState(current => {
     return {
      ...current,
      submitting: false,
      valuesMissing: false,
      submittedSuccessfully: null,
     };
    });
   }, 2000);
  }
 };

 return (
  <div
   className={`content-wrapper add-product ${lowVisionOn ? "low-vision" : ""}`}
  >
   <input
    type="text"
    placeholder="Name"
    value={state?.name ?? ""}
    onChange={event =>
     setState(current => {
      return {
       ...current,
       name: event.target.value,
      };
     })
    }
   />
   <div className="dropdown-wrapper">
    <button
     className="category-dropdown"
     style={state?.dropdownDropped ? {} : { borderBottom: "none" }}
     onClick={() =>
      setState(current => {
       return {
        ...current,
        dropdownDropped: !current?.dropdownDropped,
       };
      })
     }
    >
     <span style={{ opacity: state?.pickedCategory ? "1" : ".3" }}>
      {state?.pickedCategory ? state.pickedCategory : "Category"}
     </span>
     <div className="arrow down"></div>
    </button>
    <div
     className="dropdown-list"
     style={{ display: state?.dropdownDropped ? "flex" : "none" }}
    >
     {state?.categories.map(category => {
      return (
       <button
        className={state?.pickedCategory === category ? "picked" : ""}
        key={category}
        onClick={() =>
         setState(current => {
          return {
           ...current,
           pickedCategory: category,
           dropdownDropped: false,
          };
         })
        }
       >
        {category}
       </button>
      );
     })}
    </div>
   </div>
   <div
    className={`form-alert ${state?.submittedSuccessfully ? "success" : ""} ${
     state?.valuesMissing ? "failure" : ""
    }`}
    style={{
     display:
      state?.valuesMissing || state?.submittedSuccessfully ? "block" : "none",
    }}
   >
    {state?.valuesMissing ? "Missing values" : null}
    {state?.submittedSuccessfully ? "Success" : null}
   </div>
   <button
    className={`submit-btn btn submit ${state?.submitting ? "inactive" : ""}`}
    onClick={() => handleSubmit()}
   >
    {state?.submitting && !state?.valuesMissing ? "Submitting..." : "Submit"}
   </button>
   <button
    className={`btn remove ${state?.submitting ? "inactive" : ""}`}
    onClick={() => navigateTo("/manageProducts/")}
   >
    Cancel
   </button>
  </div>
 );
};

export default AddProduct;
