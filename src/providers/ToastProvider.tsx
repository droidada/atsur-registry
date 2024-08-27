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
          border: "1px solid #e0e0e0",
          backgroundColor: "#fff",
          color: "#333",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          fontWeight: "500",
          padding: "16px",
          width: "400px",
          minHeight: "auto",
        }}
        bodyClassName="text-sm leading-relaxed"
        closeButton={
          <button
            aria-label="Close Toast"
            className="ml-4 text-gray-500 hover:text-gray-800"
          >
            <IoClose />
          </button>
        }
        icon={<span className="text-xl text-black">ℹ️</span>} // Custom icon example
      />
    </ToastContext.Provider>
  );
};
