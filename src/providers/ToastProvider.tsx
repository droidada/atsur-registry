// ToastProvider.js
import React, { createContext, useContext } from "react";
import { Toaster, toast } from "react-hot-toast";

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
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={0}
        containerClassName=""
        containerStyle={{ width: "100%" }}
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #A4442B",
            padding: "16px",
            color: "#A4442B",
            borderRadius: 0,
            width: "100%",
          },
        }}
      />
    </ToastContext.Provider>
  );
};
