import IArtistDetails from "@/types/models/artistDetails";
import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { BsFillFolderFill } from "react-icons/bs";
import { GiPaintBrush } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";

import dynamic from "next/dynamic";

const Details = dynamic(() => import("./Details"), {
  ssr: false,
});
const Projects = dynamic(() => import("./Projects"), {
  ssr: false,
});
const Favourites = dynamic(() => import("./Favourites"), {
  ssr: false,
});
const Board = dynamic(() => import("./Board"));

interface Props {
  artist: IArtistDetails;
}
const RightSection: React.FC<Props> = ({ artist }) => {
  const [value, setValue] = useState(0);
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = [
    {
      label: "Bio",
      icon: <IoIosMenu size={15} />,
    },
    {
      label: "Pieces",
      icon: <BsFillFolderFill size={15} />,
    },
    // {
    //   label: "My Board",
    //   icon: <GiPaintBrush className="rotate-90" size={15} />,
    // },
    {
      label: "Favorites",
      icon: <FaHeart size={15} />,
    },
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <section className="mt-10 flex-1">
      <div className="">
        <div className="flex justify-between items-center ">
          {tabs.map((tab, index) => (
            <div
              onClick={() => setCurrentTab(index)}
              className={`flex gap-4  justify-center ${
                currentTab == index ? "bg-secondary text-primary" : ""
              } items-center font-[600] p-2 px-4 w-full cursor-pointer text-[19px]  h-fit rounded-[21px] `}
              key={tab.label}
            >
              {tab.icon}
              {tab.label}
            </div>
          ))}
        </div>
        {/* <Tabs
          TabIndicatorProps={{ style: { display: "none" } }}
          onChange={handleChange}
          variant="fullWidth"
          component={"div"}
          value={value}
        >
          {tabs.map((tab, index) => (
            <Tab
              {...tab}
              className={`font-[600] py-0 text-[19px] min-w-fit w-fit min-h-[49px] h-fit rounded-[21px] ${
                value == index ? "bg-secondary" : ""
              }`}
              key={index}
              iconPosition={"start"}
            />
          ))}
        </Tabs> */}

        <div className="mt-10">
          {
            [
              <Details artist={artist} key={"details"} />,
              <Projects artistId={artist?._id} key={"projects"} />,
              // <Board key={"board"} />,
              <Favourites artistId={artist?._id} key={"favorites"} />,
            ][currentTab]
          }
        </div>
      </div>
    </section>
  );
};

export default RightSection;
