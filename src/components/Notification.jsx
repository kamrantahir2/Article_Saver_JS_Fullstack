import { useState, useImperativeHandle, forwardRef } from "react";

const Notification = ({ message, styling }) => {
  return (
    <div className={styling}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
