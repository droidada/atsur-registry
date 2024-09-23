import { useState } from "react";
import axios from "@/lib/axios";
import { Stack } from "@mui/material";

import UnprotectedPage from "@/HOC/Unprotected";
import ArtPieceTab from "@/components/ExplorePage/Tabs/ArtPieceTab";

function Explore() {
  const tabs = ["Artworks", "Artists", "Series", "Collections"];
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Stack spacing={4} className="">
      <div className="flex gap-1 py-6 page-container ">
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

      <div className="page-container">
        {[<ArtPieceTab key={`Art-piece tab`} />][currentTab]}
      </div>
    </Stack>
  );
}

export default UnprotectedPage(Explore);
