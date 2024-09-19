import { Button } from "@mui/material";
import React from "react";

const ComingSoonComponent = () => {
  return (
    <section className="py-10 flex flex-col items-center gap-4">
      <h2 className="text-center text-5xl font-bold" data-aos="fade-up">
        Coming Soon
      </h2>
      <p className="text-xl text-center font-[300]" data-aos="fade-up">
        Physically attach tags to your artworks
      </p>
      <div className="flex gap-2 w-full justify-center" data-aos="fade-up">
        <input
          type="email"
          placeholder="Your email here"
          className="border m focus:border-none focus:outline-none"
        />
        <Button className="bg-primary text-white">
          Notify me when page is active
        </Button>
      </div>
    </section>
  );
};

export default ComingSoonComponent;
