import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import HeroImage1 from "../../../public/images/hero-join/1.png";
import HeroImage2 from "../../../public/images/hero-join/2.png";
import HeroImage3 from "../../../public/images/hero-join/3.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { IoIosSearch } from "react-icons/io";

interface Props {
  heroImages: string[];
}

const HeroSection: React.FC<Props> = ({ heroImages }) => {
  const router = useRouter();
  const { status } = useSession();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("artworks");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query) {
      router.push(`/explore/?search=${query}?type=${type}`);
    }
  };

  return (
    <Stack
      component={"section"}
      direction={{ xs: "column", md: "row" }}
      alignItems="start"
      justifyContent="center"
      className="pb-10 page-container"
      spacing={8}
      data-aos="fade-up" // Smooth fade-up for the entire section
    >
      <Stack
        className=""
        spacing={2}
        direction={"column"}
        data-aos="fade-right"
      >
        <Typography
          className="text-2xl md:text-3xl max-w-[764px] lg:text-6xl lg:leading-[65px] font-[400]"
          variant="h1"
          data-aos="zoom-in"
        >
          Find verified information on African art and artifacts
        </Typography>

        <form onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="200">
          <div className="max-w-[505px] w-full  items-center py-2 pr-1  justify-between   border border-primary flex gap-2">
            <select
              className="w-[10px] lg:w-fit px-4  md:px-6  md:w- ml-2 "
              id="category"
              name="category"
            >
              <option value="artworks">Artworks</option>
              <option value="collections">Collections</option>
              <option value="artists">Artists</option>
            </select>
            <input
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Artworks, Collections ..."
              type="text"
              className=" flex-1 flex-shrink bg  h-full border-none outline-none hover:outline-none focus:ring-0 focus:outline-none"
            />
            <button className="text-white p-1 md:p-2 shadow-sm hover:bg-primary-dark transition-all duration-300 h-[40px]  flex items-center  gap-2 bg-primary">
              {" "}
              <IoIosSearch /> <span className="hidden md:block">Search</span>
            </button>
          </div>
        </form>
      </Stack>
      <div className="relative hidden md:flex" data-aos="fade-left">
        <Image
          src={(heroImages?.length > 0 && heroImages[0]) || HeroImage1}
          width={314}
          height={450}
          alt=""
          className=" "
          data-aos="zoom-in"
          data-aos-delay="600"
        />
        <Image
          src={(heroImages?.length > 1 && heroImages[1]) || HeroImage2}
          width={239}
          height={313}
          alt=""
          className="absolute -bottom-[20%] -left-[60%]"
          data-aos="zoom-in"
          data-aos-delay="700"
        />
        <Image
          alt=""
          src={HeroImage3}
          width={136}
          height={136}
          className="absolute -bottom-[25%] left-4"
          data-aos="zoom-in"
          data-aos-delay="800"
        />
      </div>
    </Stack>
  );
};

export default HeroSection;
