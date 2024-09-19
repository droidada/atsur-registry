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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query) {
      router.push(`/explore/more?search=${query}`);
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
          className="text-2xl md:text-3xl max-w-[764px] lg:text-6xl lg:leading-[65px] font-[400]  "
          variant="h1"
          data-aos="zoom-in" // Zoom-in for a dynamic entrance
        >
          Find verified information on African art and artifacts
        </Typography>
        <form
          onSubmit={handleSubmit}
          data-aos="fade-up"
          data-aos-delay="200"
          className="max-w-[595px] items-center p-2  h-[50px] border border-primary flex gap-2"
        >
          <input
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Artworks, Collections ..."
            type="text"
            className="flex-1 h-full border-none outline-none hover:outline-none focus:ring-0 focus:outline-none"
          />
          <Button className="text-white bg-primary" startIcon={<IoIosSearch />}>
            {" "}
            Search
          </Button>
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
