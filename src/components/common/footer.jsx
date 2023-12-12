import React from "react";
import Input from "@mui/material/Input";
import logo2 from "@/assets/logo2.png";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="p-10 text-[12px] bg-[#F2F2F2]">
      <div className="flex flex-wrap justify-between">
        <div className="flex-1">
          <h5 className="mb-2">NEWSLETTER</h5>
          <p className="text-[10px] mb-3">Join us and all the other things</p>
          <Input
            id="input-with-icon-adornment"
            placeholder="Search"
            sx={{ width: "50%", fontSize: "12px", mb: "20px" }}
          />
        </div>
        <div className="flex flex-wrap gap-8 mb-[20px]">
          <div className="flex flex-col gap-3">
            <h6 className="font-bold uppercase">About Us</h6>
            <div className="flex flex-col gap-2">
              <p>Artist & Collector Rights</p>
              <p>Press</p>
              <p>Sustainability</p>
              <p>Jobs</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h6 className="font-bold uppercase">Resources</h6>
            <div className="flex flex-col gap-2">
              <p>Open Source</p>
              <p>Blog</p>
              <p>FAQ</p>
              <p>How it works</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h6 className="font-bold uppercase">Partnerships</h6>
            <div className="flex flex-col gap-2">
              <p>Galleries</p>
              <p>Museums</p>
              <p>Auctions</p>
              <p>Fairs</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h6 className="font-bold uppercase">Support</h6>
            <div className="flex flex-col gap-2">
              <p>Help Center</p>
              <p>Talk to Specialist</p>
              <p>FAQ</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Image src={logo2} className="w-[100px] h-[40px]" />
        <div className="flex gap-10 mt-3">
          <p>© 2010 — 2020</p>
          <p>Privacy — Terms</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
