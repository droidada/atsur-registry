import { Button, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { CgArrowTopRight } from "react-icons/cg";
import { FiPlus } from "react-icons/fi";

interface Props {
  handleExplore: () => void;
  handleCreate: () => void;
  type: "collections" | "artworks" | "organizations";
}
const HeroHeader: React.FC<Props> = ({ handleExplore, handleCreate, type }) => {
  const { data } = useSession();
  return (
    <div className="h-[257px] relative  justify-center px-4 md:px-10 lg:px-20 w-full flex flex-col bg-primary">
      <Image
        // @ts-ignore
        src={data?.user?.backgroundImage}
        fill
        alt=""
        className="object-cover"
      />
      <div className="text-white relative">
        <h3 className="uppercase text-[10px] tracking-[30%] leading-[16px]">
          {type}
        </h3>
        <h1 className=" text-2xl md:text-[50px] md:leading-[70px]">
          {/* @ts-ignore */}
          {data?.user?.firstName} {data?.user?.lastName[0]}.
        </h1>
        <Stack direction="row" className="mt-2" spacing={2}>
          <Button
            onClick={handleExplore}
            className="bg-white text-[15px] leading-[16px] font-[400] h-[37px] w-[113px] px-2"
            endIcon={
              <span className="w-[17px] rounded-[2px] h-[17px] border-[1px] border-primary grid place-items-center">
                <CgArrowTopRight size={12} />
              </span>
            }
          >
            Explore
          </Button>

          <Button
            onClick={handleCreate}
            className="bg-white text-[15px] leading-[16px] font-[400] h-[37px] w-[113px] px-2"
            endIcon={
              <span className="w-[17px] rounded-[2px] h-[17px] border-[1px] border-primary grid place-items-center">
                <FiPlus size={12} />
              </span>
            }
          >
            Create
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default HeroHeader;
