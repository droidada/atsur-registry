import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import HeroImage1 from "../../../public/images/hero-join/1.png";
import HeroImage2 from "../../../public/images/hero-join/2.png";
import HeroImage3 from "../../../public/images/hero-join/3.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface Props {
  heroImages: string[];
}

const HeroSection: React.FC<Props> = ({ heroImages }) => {
  const router = useRouter();
  const { status } = useSession();
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
        <Typography
          className="text-sm text-justify max-w-[551px]"
          variant="body1"
          data-aos="fade-up" // Smooth fade-up for text
          data-aos-delay="200" // Add delay to stagger animation
        >
          Vorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus. Maecenas eget condimentum velit, sit amet feugiat
          lectus. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra
        </Typography>
        <Stack direction={"row"} spacing={2} data-aos="fade-up">
          <Button
            onClick={() => router.push("/explore/more")}
            endIcon={<MdOutlineArrowOutward />}
            className="h-[36px] bg-primary text-white font-[400] hover:scale-95 duration-700 text-[15px] leading-[16px]"
            data-aos="fade-up" // Smooth fade-up for buttons
            data-aos-delay="400" // Add delay for staggered entrance
          >
            Explore
          </Button>
          <Button
            onClick={() =>
              status === "authenticated"
                ? router.push("/dashboard")
                : router.push("/signup")
            }
            endIcon={<MdOutlineArrowOutward />}
            className="h-[36px] bg-secondary text-primary font-[400] hover:scale-95 duration-700 text-[15px] leading-[16px]"
            data-aos="fade-up"
            data-aos-delay="500" // Further delay for staggered effect
          >
            {status === "authenticated" ? "Dashboard" : "Get Started"}
          </Button>
        </Stack>
      </Stack>
      <div className="relative hidden md:flex" data-aos="fade-left">
        <Image
          src={(heroImages?.length > 0 && heroImages[0]) || HeroImage1}
          width={314}
          height={450}
          alt=""
          className=" "
          data-aos="zoom-in" // Zoom-in for images for dynamic effect
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
