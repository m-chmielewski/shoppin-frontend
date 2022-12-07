import React from "react";

import "./Modal.css";

import { Button, Card } from "@mchm/common";

const Modal = props => {
 return (
  <div className="modal-wrapper">
   <Card>
    {props.message.split("\n").map(line => {
     return <span>{line}</span>;
    })}
    {props.onConfirm && (
     <Button
      variant="positive"
      onClick={props.onConfirm}
     >
      Yes
     </Button>
    )}
    {props.onDecline && (
     <Button
      variant="negative"
      onClick={props.onDecline}
     >
      No
     </Button>
    )}
    {props.onCancel && (
     <Button
      variant="ghost"
      onClick={props.onCancel}
     >
      Cancel
     </Button>
    )}
   </Card>
  </div>
 );
};

export default Modal;
