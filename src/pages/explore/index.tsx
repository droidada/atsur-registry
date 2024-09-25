import { useState } from "react";
import axios from "@/lib/axios";
import { Stack } from "@mui/material";

import UnprotectedPage from "@/HOC/Unprotected";
import ArtPieceTab from "@/components/ExplorePage/Tabs/ArtPieceTab";
import ArtistTab from "@/components/ExplorePage/Tabs/ArtistTab";
import SeriesTab from "@/components/ExplorePage/Tabs/SeriesTab";
import CollectionTab from "@/components/ExplorePage/Tabs/CollectionTab";

function Explore() {
  const tabs = ["Artworks", "Artists", "Series", "Collections"];
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Stack spacing={4} className="page-container">
      <div className="flex gap-1 py-6  ">
        {tabs?.map((tab, index) => (
          <div
            onClick={() => setCurrentTab(index)}
            key={`${tab}-${index}`}
            className={` p-2 cursor-pointer border-r-[1px] text-3xl  ${
              currentTab === index ? " font-bold" : ""
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="">
        {
          [
            <ArtPieceTab key={`Art-piece tab`} />,
            <ArtistTab key={`Artist tab`} />,
            <SeriesTab key={`Series tab`} />,
            <CollectionTab key={`Collection tab`} />,
          ][currentTab]
        }
      </div>
    </Stack>
  );
}

export default UnprotectedPage(Explore);
