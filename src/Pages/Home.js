import React from "react";

import { PageContent, Button } from "@mchm/common";

const Home = () => {
 return (
  <PageContent>
   <h1>Shoppin</h1>
   <Button href="/compose/">Compose</Button>
   <Button href="/shop/">Shop</Button>
   <Button href="/addProduct/">Add product</Button>
   <Button href="/settings/">Settings</Button>
  </PageContent>
 );
};

export default Home;
