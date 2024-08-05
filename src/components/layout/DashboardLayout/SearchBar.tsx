import { Button, MenuItem } from "@mui/material";
import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <form className="h-[50px] p-[9px] flex gap-2 w-full mx-auto border-primary border-[1px] divide-x-2">
      <div className="flex items-center gap-3">
        <select
          className="w-[113px] md:w-fit border-none focus:outline-none outline-none text-[17px] leading-[16px font-[400]"
          defaultValue={"artwork"}>
          <option
            className="text-[17px] leading-[16px] font-[400]"
            defaultChecked
            value="artwork"
          >
            Artwork
          </option>
          <option
            className="text-[17px] leading-[16px] font-[400]"
            value="collection"
          >
            Collection
          </option>
          <option
            className="text-[17px] leading-[16px] font-[400]"
            value="organization"
          >
            Organization
          </option>
        </select>
      </div>
      <input
        type="text "
        placeholder="Search Artworks, Collections ..."
        className="w-full flex-1 px-2 text-[13px] leading-[16px] text-primary outline-none bg-transparent "
      />
      <Button
        startIcon={<FaSearch size={13} />}
        className="bg-primary text-xs px-2 font-[400] text-white"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
