import React, { useEffect, useState } from "react";

import { visitorAlert } from "@mchm/common";
import { PageContent, Toolbar } from "@mchm/common";

import List from "../Components/List";
import SearchBox from "../Components/SearchBox";

const Shop = () => {
 const [searchPhrase, setSearchPhrase] = useState(null);

 useEffect(() => {
  visitorAlert("shoppin", "shop");
 }, []);

 const menuItems = [
  {
   name: "Search",
   action: () => setSearchPhrase(""),
  },
 ];

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
    {searchPhrase === null && <h1>Shop</h1>}
    <List
     variant="shop"
     searchPhrase={searchPhrase}
    />
   </PageContent>
  </>
 );
};

export default Shop;
