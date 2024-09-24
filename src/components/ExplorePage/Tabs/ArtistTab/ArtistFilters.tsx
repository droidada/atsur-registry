import { Button } from "@mui/material";
import React from "react";

const ArtistFilters = () => {
  return (
    <aside className="hidden md:flex sticky min-h-screen left-0 top-0 flex-col w-full max-w-[281px] bg-secondary-white ">
      <div className="py-5 px-5 border-b-[1px] border-primary text-[18px] leading-[15px] flex justify-between items-center gap-4">
        <Button
          //   onClick={() => setCurrentActionType("filter")}
          variant="text"
          className={`text-[18px] leading-[15px]  font-bold

          `}
        >
          Filter
        </Button>
        <Button
          //   onClick={() =>
          //     setFilter({
          //       medium: [],
          //       rarity: [],
          //       priceRange: {
          //         min: 0,
          //         max: 0,
          //       },
          //       creationDecade: [],
          //     })
          //   }
          variant="text"
          className={`text-[18px] leading-[15px] bg-black  font-bold
        `}
        >
          Clear Filters
        </Button>
      </div>

      <div className="flex flex-col gap-4 p-5">
        <h3 className="font-[500] text-[15px] leading-[15px]">Gender</h3>
        <div className="flex gap-4">
          <div className="flex gap-2 items-center">
            <label htmlFor="male" className="text-xs leading-[12px] font-[300]">
              Male
            </label>
            <input
              id="male"
              name="gender"
              className="ring-0 fouc:ring-0 outline-none"
              //   onChange={() =>
              //     setFilter({
              //       ...filters,
              //       verification: true,
              //     })
              //   }
              type="radio"
            />
          </div>
          <div className="flex gap-2 items-center">
            <label
              htmlFor="female"
              className="text-xs leading-[12px] font-[300]"
            >
              Female
            </label>
            <input
              id="female"
              className="ring-0 focus:ring-0 outline-none"
              name="gender"
              //   onChange={() =>
              //     setFilter({
              //       ...filters,
              //       verification: false,
              //     })
              //   }
              type="radio"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ArtistFilters;
