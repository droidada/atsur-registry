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
        src={backgroundImg || "/background-placeholder.jpeg"}
        width={1196}
        alt="cover"
        height={224}
        className="w-full h-[224px] bg-primary object-cover"
      />
    </div>
  );
};

export default HeroSection;
