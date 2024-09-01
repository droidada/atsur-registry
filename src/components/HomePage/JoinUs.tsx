import { Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";

const JoinUs = () => {
  const router = useRouter();
  return (
    <Stack
      spacing={2}
      alignItems={"center"}
      direction="column"
      className="py-[58px] px-4 bg-secondary text-primary"
      data-aos="fade-up"
    >
      <h2
        className="text-2xl max-w-[764px] w-full md:text-3xl lg:text-[41px] lg:leading-[60px] text-center"
        data-aos="fade-down"
      >
        Join Africa&apos;s largest and most trusted Art and artifacts collection
      </h2>
      <Button
        onClick={() => router.push("/explore/more")}
        variant="contained"
        endIcon={<MdOutlineArrowOutward />}
        className="bg-primary w-[159px] text-[17px] leading-[16px] font-[400] text-secondary"
        data-aos="zoom-in"
        data-aos-delay="300"
      >
        Explore
      </Button>
    </Stack>
  );
};

export default JoinUs;
