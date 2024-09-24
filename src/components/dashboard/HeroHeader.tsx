import { Button, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { CgArrowTopRight } from "react-icons/cg";
import { FiPlus } from "react-icons/fi";

interface Props {
  handleExplore: () => void;
  handleCreate: () => void;
  type: string;
  createTitle?: string;
}
const HeroHeader: React.FC<Props> = ({
  handleExplore,
  handleCreate,
  type,
  createTitle,
}) => {
  const { data } = useSession();
  return (
    <div className=" relative  justify-center px-4  w-full flex flex-col ">
      {/* <Image
        // @ts-ignore
        src={data?.user?.backgroundImage || "/background-placeholder.jpeg"}
        fill
        alt=""
        className="object-cover"
      /> */}
      <div className=" relative">
        {/* <h3 className="uppercase text-2xl font-bold ">{type}</h3> */}
        {/* <h1 className=" text-2xl md:text-[50px] md:leading-[70px]"> */}
        {/* @ts-ignore */}

        <Stack
          direction="row"
          justifyContent={"end"}
          className="mt-2"
          spacing={2}
        >
          {/* <Button
            onClick={handleExplore}
            className="bg-white text-[15px] leading-[16px] font-[400] h-[37px] w-[113px] px-2"
            endIcon={
              <span className="w-[17px] rounded-[2px] h-[17px] border-[1px] border-primary grid place-items-center">
                <CgArrowTopRight size={12} />
              </span>
            }
          >
            Explore
          </Button> */}

          {/* <Button
            onClick={handleCreate}
            variant="contained"
            className="bg-primary text-[15px] leading-[16px] font-[400] h-[37px] w-[113px] px-2"
            endIcon={
              <span className="w-[17px] rounded-[2px] h-[17px] border-[1px] border-primary grid place-items-center">
                <FiPlus size={12} />
              </span>
            }
          >
            {createTitle || "Create"}
          </Button> */}
        </Stack>
      </div>
    </div>
  );
};

export default HeroHeader;
