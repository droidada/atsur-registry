import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import HeroImage1 from "../../../public/images/hero-join/1.png";
import HeroImage2 from "../../../public/images/hero-join/2.png";
import HeroImage3 from "../../../public/images/hero-join/3.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
const HeroSection = () => {
  const router = useRouter();
  const { status } = useSession();
  return (
    <Stack
      component={"section"}
      direction={{ xs: "column", md: "row" }}
      justifyContent="space-between"
      alignItems="start"
      className="pb-10"
      spacing={4}
    >
      <Stack className="" spacing={2} direction={"column"}>
        <Typography
          className="text-2xl md:text-3xl max-w-[764px] lg:text-6xl lg:leading-[65px] font-[400]  "
          variant="h1"
        >
          Find verified information on African art and artifacts
        </Typography>
        <Typography
          className="text-sm text-justify max-w-[551px]"
          variant="body1"
        >
          Vorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus. Maecenas eget condimentum velit, sit amet feugiat
          lectus. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra
        </Typography>
        <Stack direction={"row"} spacing={2}>
          <Button
            onClick={() => router.push("/explore/more")}
            endIcon={<MdOutlineArrowOutward />}
            className="h-[29px] bg-primary text-white font-[400] hover:scale-95 duration-700 text-[15px] leading-[16px]"
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
            className="h-[29px] bg-secondary text-primary font-[400] hover:scale-95 duration-700 text-[15px] leading-[16px]"
          >
            {status === "authenticated" ? "Dashboard" : "Get Started"}
          </Button>
        </Stack>
      </Stack>
      <div className=" relative hidden  md:flex">
        <Image src={HeroImage1} width={314} height={450} alt="" className=" " />
        <Image
          src={HeroImage2}
          width={239}
          height={313}
          alt=""
          className="absolute -bottom-[20%] -left-[60%]"
        />
        <Image
          alt=""
          src={HeroImage3}
          width={136}
          height={136}
          className="absolute -bottom-[25%] left-4"
        />
      </div>
    </Stack>
  );
};

export default HeroSection;
