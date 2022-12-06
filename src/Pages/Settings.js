import React from "react";

import "./Settings.css";

import { visitorAlert } from "@mchm/common";
import { Button, Card, PageContent, Toolbar } from "@mchm/common";

const Settings = ({ regularVisionSwitch, regularVisionOn }) => {
 visitorAlert("shoppin", "settings");

 return (
  <>
   <Toolbar
    backPath="/"
    backLabel="Shoppin"
   />
   <PageContent className="settings with-nav">
    <h1>Settings</h1>
    <Card>
     <span>Low vision mode</span>
     <Button
      variant={`${regularVisionOn ? "positive" : "negative"}`}
      onClick={() => regularVisionSwitch()}
     >
      Turn {regularVisionOn ? "on" : "off"}
     </Button>
    </Card>
   </PageContent>
  </>
 );
};

export default Settings;
