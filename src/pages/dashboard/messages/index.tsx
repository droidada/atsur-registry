import ProtectedPage from "@/HOC/Protected";
import React from "react";

const Messages = () => {
  return (
    <div>
      <div className="border-b-[1px] py-3">
        <h1 className="font-[600] text-2xl lg:text-3xl">Messages</h1>
      </div>
    </div>
  );
};

export default ProtectedPage(Messages);
