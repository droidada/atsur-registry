// ToastProvider.js
import React, { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoClose } from "react-icons/io5";

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={5000} // Adjusted duration for auto-dismissal
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          border: "none",
          color: "#A4442B",
          borderRadius: "8px",
        }}
        closeButton={
          <button aria-label="Close Toast" className="ml-4  text-red-500">
            <IoClose />
          </button>
        }
      />
    </ToastContext.Provider>
  );
};
