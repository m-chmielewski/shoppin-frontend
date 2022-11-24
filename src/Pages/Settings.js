import React from "react";

import "./Settings.css";

import { PageContent, Card, Button } from "@mchm/common";

const Settings = ({ regularVisionSwitch, regularVisionOn }) => {
 return (
  <PageContent className="settings">
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
 );
};

export default Settings;
