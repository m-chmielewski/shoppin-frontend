import React, { useState, useEffect } from "react";
import Axios from "axios";

import {
 Card,
 PageContent,
 SubmitSection,
 SuggestiveInput,
 Toolbar,
} from "@mchm/common";

import { useFormData, useFormState } from "@mchm/common";
import { validationCriteria, visitorAlert } from "@mchm/common";

const randomIdPrefix = Date.now().toString(); //To stop browsers from making input suggestions

const AddProduct = () => {
 const { formData, handleSimpleInputChange, revertToInitialState } =
  useFormData({
   name: "",
   category: "",
  });

 const formValidationCriteria = {
  name: validationCriteria.REQUIRED,
  category: validationCriteria.REQUIRED,
 };

 const [formState, handleSubmit, dropdownsHandle] = useFormState(
  formData,
  `${process.env.REACT_APP_BACKEND_URL}/products`,
  formValidationCriteria,
  revertToInitialState
 );

 const [categoriesList, setCategoriesList] = useState();

 useEffect(() => {
  visitorAlert("shoppin", "addProduct");

  Axios.get(`${process.env.REACT_APP_BACKEND_URL}/categories/`)
   .then(response => setCategoriesList(response.data))
   .catch(error => {
    console.log(error);
   });

  const html = document.getElementsByTagName("html")[0];

  html.addEventListener("keydown", event => {
   if (
    event.key === "Enter" &&
    event.target.type !== "submit" &&
    event.target.type !== "textarea"
   ) {
    event.preventDefault();

    event.target.click();
   }
  });

  html.addEventListener("click", event => {
   if (!event.target.id.startsWith(`${randomIdPrefix}-category`)) {
    dropdownsHandle(false);
   }
  });
 }, [dropdownsHandle]);

 if (!categoriesList) return <div>Loading...</div>;

 return (
  <>
   <Toolbar
    backLabel="Shoppin"
    backPath="/"
   />
   <PageContent className="with-nav">
    <h1>Add product</h1>
    <form onSubmit={event => handleSubmit(event)}>
     <fieldset style={{ display: "flex", flexDirection: "column" }}>
      <legend style={{ display: "none" }}>Add product</legend>
      <Card>
       <label htmlFor={`${randomIdPrefix}-name`}>Product name</label>
       <input
        id={`${randomIdPrefix}-name`}
        type="text"
        value={formData.name}
        onChange={event => {
         handleSimpleInputChange("name", event.target.value);
        }}
        placeholder="Name"
       />
       <SuggestiveInput
        id={`${randomIdPrefix}-category`}
        value={formData.category}
        placeholder="Category"
        label="Category"
        options={categoriesList}
        dataNature="simple"
        fieldName="category"
        onInputChange={handleSimpleInputChange}
        dropdownsHandle={dropdownsHandle}
        listDown={formState.dropdowns[0]}
       />
      </Card>
     </fieldset>
     <SubmitSection formState={formState} />
    </form>
   </PageContent>
  </>
 );
};

export default AddProduct;
