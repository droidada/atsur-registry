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
      {/* Tabs container */}
      <div className="flex gap-8 py-4 border-b-[1px] border-gray-300">
        {tabs?.map((tab, index) => (
          <div
            key={`${tab}-${index}`}
            onClick={() => setCurrentTab(index)}
            className={`cursor-pointer text-xl px-6 py-2 tracking-wide transition-all duration-300 ease-in-out
              ${
                currentTab === index
                  ? "font-semibold text-black border-b-2 border-black"
                  : "text-gray-500 hover:text-black hover:border-b-2 hover:border-gray-500"
              }`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Tab content */}
      <div className="pt-6">
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
