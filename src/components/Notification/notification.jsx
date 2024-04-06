// Toast.js
import React, { useEffect } from "react";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = ({ message, type }) => {
  useEffect(() => {
    toast[type](message);
  }, [message, type]);

  return null; // The component doesn't render anything visible to the DOM
};

Toast.defaultProps = {
  autoClose: 3000,
  position: "top-right",
  hideProgressBar: true,
  transition: Slide,
  theme: "colored",
};

export default Toast;
