// ToastProvider.js
import React, { createContext, useContext } from "react";
import { Toaster, toast } from "react-hot-toast";
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
      <Toaster
        position="top-center"
        // reverseOrder={false}
        gutter={0}
        containerClassName=""
        containerStyle={{ width: "100%" }}
        toastOptions={{
          duration: Infinity,
          className: "text-sm",
          // style: {
          //   border: "1px solid #A4442B",
          //   padding: "16px",
          //   color: "#A4442B",
          //   borderRadius: 0,
          //   width: "100%",
          // },
        }}
      >
        {(toast) => <CustomToast t={toast} key={toast.id} />}
      </Toaster>
    </ToastContext.Provider>
  );
};

const CustomToast = ({ t }) => (
  <div
    className={`${
      t.visible ? "animate-sleek-in" : "animate-sleek-out"
    } max-w-md w-full bg-white ${
      t.type === "success"
        ? "text-green-500"
        : t.type === "error"
        ? "text-red-500"
        : "text-blue-500"
    } shadow-md rounded-lg pointer-events-auto p-4 flex items-center text-sm justify-between `}
  >
    <span>{t.message}</span>
    <button
      onClick={() => toast.dismiss()}
      className="ml-4 text-lg  text-red-500"
    >
      <IoClose />
    </button>
  </div>
);
