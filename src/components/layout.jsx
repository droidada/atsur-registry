import React from "react";
import Header from "./header";
import Footer from "./footer";

const Layout = ({ children }) => {
  return (
    <div className="bg-white text-black min-h-[100vh]">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
