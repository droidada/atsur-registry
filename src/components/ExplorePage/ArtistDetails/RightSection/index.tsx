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

  const tabs = [
    {
      label: "Detail",
      icon: <IoIosMenu size={15} />,
    },
    {
      label: "My Projects",
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
        <Tabs
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
        </Tabs>

        <div className="mt-10">
          {
            [
              <Details artist={artist} key={"details"} />,
              <Projects artistId={artist?._id} key={"projects"} />,
              // <Board key={"board"} />,
              <Favourites artistId={artist?._id} key={"favorites"} />,
            ][value]
          }
        </div>
      </div>
    </section>
  );
};

export default RightSection;
