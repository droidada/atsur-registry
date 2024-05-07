import { Avatar } from "@mui/material";
import Image from "next/image";
import React from "react";

interface Props {
  backgroundImg?: string;
  avatar: string;
  name: string;
}
const HeroSection: React.FC<Props> = ({ backgroundImg, avatar, name }) => {
  return (
    <div className="relative">
      <Image
        src={backgroundImg}
        width={1196}
        alt="cover"
        height={224}
        className="w-full h-[224px] bg-primary object-cover"
      />
      <Avatar
        className=" w-[150px] h-[150px]  md:w-[204px] md:h-[204px] absolute left-[5%] -bottom-[15%] lg:-bottom-[50%]"
        src={avatar}
        alt={name}
      />
    </div>
  );
};

export default HeroSection;
