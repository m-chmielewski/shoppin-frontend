import React, { useEffect, useState } from "react";

import { visitorAlert } from "@mchm/common";
import {
 CategoryWrapper,
 Fetcher,
 PageContent,
 SelectableCard,
 Toolbar,
} from "@mchm/common";

import { capitalize } from "../Utils/text";

import useList from "../Hooks/useList";

import Modal from "./Modal";
import SearchBox from "./SearchBox";

const List = props => {
 if (!["shop", "compose"].includes(props.variant)) {
  throw new Error("Provide valid List.variant");
 }

 const [modal, setModal] = useState();

 const {
  products,
  searchPhrase,
  setSearchPhrase,
  dropdowns,
  setDropdowns,
  onFetched,
  selectionHandle,
  categoriesProvider,
  allInCart,
  stateSwitch,
  searchResult,
  finalizeList,
 } = useList(props.variant);

 const menuItems = [
  {
   name: "Search",
   action: () => setSearchPhrase(""),
  },
  {
   name: "Expand all",
   action: () => {
    const newDropdownsObj = {};
    Object.keys(dropdowns).forEach(category => {
     newDropdownsObj[category] = true;
    });
    setDropdowns(newDropdownsObj);
   },
  },
  {
   name: "Collapse all",
   action: () => {
    const newDropdownsObj = {};
    Object.keys(dropdowns).forEach(category => {
     newDropdownsObj[category] = false;
    });
    setDropdowns(newDropdownsObj);
   },
  },
 ];

 if (props.variant === "shop") {
  menuItems.push({
   name: "Done",
   action: () => {
    let noneLeft = true;
    Object.keys(products).forEach(category => {
     noneLeft = noneLeft && allInCart(category);
    });
    if (!noneLeft) {
     setModal({
      message:
       "There are unchecked items on the list.\nSave them for next one?",
      onConfirm: () => {
       finalizeList(true).then(() => setModal(null));
      },
      onDecline: () => {
       finalizeList(false).then(() => setModal(null));
      },
      onCancel: () => setModal(null),
     });
    } else {
     setModal({
      message: "Are you sure?",
      onConfirm: () => {
       finalizeList(false).then(() => setModal(null));
      },
      onCancel: () => setModal(null),
     });
    }
   },
  });
 }

 useEffect(() => {
  visitorAlert("shoppin", `${props.variant}`);
 }, [props.variant]);

 if (modal?.message) {
  return <Modal {...modal} />;
 }

 return (
  <>
   {searchPhrase !== null && (
    <Toolbar closeAction={() => setSearchPhrase(null)} />
   )}
   {searchPhrase === null && (
    <Toolbar
     backPath="/"
     backLabel="Shoppin"
     menuItems={menuItems}
    />
   )}
   <PageContent className="with-nav">
    {searchPhrase !== null && (
     <SearchBox
      onChange={value => setSearchPhrase(value)}
      placeholder="Search"
     />
    )}
    {searchPhrase === null && <h1>{capitalize(props.variant)}</h1>}
    <Fetcher
     url={`${process.env.REACT_APP_BACKEND_URL}/products/forList/${props.variant}`}
     onFetched={onFetched}
     dataName="list"
    />
    {products && searchPhrase === null && (
     <ul>
      {categoriesProvider().map(category => (
       <CategoryWrapper
        category={category}
        key={category}
        crossedOut={props.variant === "shop" ? allInCart(category) : false}
        expanded={dropdowns[category]}
        onClick={() =>
         setDropdowns(current => {
          return {
           ...current,
           [category]: !current[category],
          };
         })
        }
       >
        {products[category].map(product => {
         return (
          <SelectableCard
           key={product.name}
           onClick={() => selectionHandle(product.name)}
           selected={product[stateSwitch]}
          >
           {product.name}
          </SelectableCard>
         );
        })}
       </CategoryWrapper>
      ))}
     </ul>
    )}
    {products && searchPhrase && (
     <ul>
      {searchResult().map(product => (
       <SelectableCard
        key={product.name}
        onClick={() => selectionHandle(product.name)}
        selected={product[stateSwitch]}
       >
        {product.name}
       </SelectableCard>
      ))}
     </ul>
    )}
   </PageContent>
  </>
 );
};

export default List;
