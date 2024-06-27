import UnprotectedPage from "@/HOC/Unprotected";
import { Button } from "@mui/material";
import React from "react";

const ContactPage = () => {
  return (
    <div className="flex md:flex-row flex-col min-h-screen">
      <div className="absolute lg:block hidden top-0 left-0 w-[50%] bg-secondary h-full"></div>

      <div className="flex relative max-w-[583px]  flex-col w-full pb-12 pt-5 px-4 md:px-8 ">
        <div>
          <h1 className="text-[30px] lg:text-[70px] font-bold">
            Lets get in Touch
          </h1>
          <p className="text-[24px] ">It&apos;s Ok to say Hello to Us</p>
        </div>
        <div className="grid gap-5 mt-8">
          <div className="flex flex-col ">
            <h3 className="text-lg ">Phone</h3>
            <p className="text-[26px]">090-333433433</p>
          </div>
          <div className="flex flex-col ">
            <h3 className="text-lg ">Email</h3>
            <p className="text-[26px]">info@atsur.art</p>
          </div>
          <div className="flex flex-col ">
            <h3 className="text-lg ">Address</h3>
            <p className="text-[26px]">34 Dalaba Street, Musama, FCT Abuja</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-end w-full ">
        <div className="bg-[#212121]  w-full py-5  px-4 lg:px-8">
          <div className="max-w-[574px] flex-col  flex gap-8 px-4 lg:px-8 w-full mx-auto text-white">
            <h2 className="text-[37px] font-bold ">Contact</h2>
            <form className="flex flex-col gap-4 w-full" onSubmit={() => {}}>
              <div className="flex flex-col ">
                <label className="text-[18px]" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  className="bg-transparent px-0 border-b-[1px] border-t-0 border-x-0  focus:outline-0 focus:ring-0"
                />
              </div>
              <div className="flex flex-col ">
                <label className="text-[18px]" htmlFor="name">
                  Email
                </label>
                <input
                  type="email"
                  className="bg-transparent border-b-[1px] px-0 border-t-0 border-x-0  focus:outline-0 focus:ring-0"
                />
              </div>
              <div className="flex flex-col ">
                <label className="text-[18px]" htmlFor="name">
                  Message
                </label>
                <textarea
                  name=""
                  className="bg-transparent px-0 border-b-[1px] border-t-0 border-x-0  focus:outline-0 focus:ring-0"
                  id=""
                ></textarea>
              </div>

              <Button
                className="mt-10 bg-white text-primary h-[60px] max-w-[214px] w-full"
                variant="contained"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnprotectedPage(ContactPage);
