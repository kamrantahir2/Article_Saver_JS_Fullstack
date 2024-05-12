import { useState, useImperativeHandle, forwardRef } from "react";

const Notification = forwardRef((props, refs) => {
  const [message, setMessage] = useState(null);

  const setNotificationMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  useImperativeHandle(refs, () => {
    return {
      setNotificationMessage,
    };
  });

  return (
    <div>
      <p>{message}</p>
    </div>
  );
});

export default Notification;
