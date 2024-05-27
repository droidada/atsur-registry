import { Button, Slider, SliderThumb } from "@mui/material";
import React, { Dispatch, useState } from "react";

interface Props {
  filters: any;
  setFilter: Dispatch<any>;
}

const mediums = [
  "drawing",
  "pastel",
  "pencil",
  "charcoal",
  "ink-pen",
  "chalk",
  "painting",
  "water-color-paint",
  "acrylic-paint",
  "oil-paint",
  "mixed-media",
  "collage",
  "installation",
  "assemblage",
  "sculpture",
  "clay",
  "metal",
  "glass",
  "stone",
  "wood",
  "photography",
];

const FilterComponent: React.FC<Props> = ({ filters, setFilter }) => {
  const [currentActionType, setCurrentActionType] = useState("filter");
  const [priceRange, setPriceRange] = useState([0, 100]);

  return (
    <aside className="flex sticky left-0 top-0 flex-col max-w-[281px] w-full bg-secondary-white ">
      <div className="py-5 px-5 border-b-[1px] text-[18px] leading-[15px] flex justify-between items-center gap-4">
        <Button
          onClick={() => setCurrentActionType("filter")}
          variant="text"
          className={`text-[18px] leading-[15px] ${
            currentActionType === "filter"
              ? "font-bold"
              : "font-[300] text-secondary"
          }`}
        >
          Filter
        </Button>
        <Button
          onClick={() => setCurrentActionType("sort")}
          variant="text"
          className={`text-[18px] leading-[15px] ${
            currentActionType === "sort"
              ? "font-bold"
              : "font-[300] text-secondary"
          }`}
        >
          Sort
        </Button>
      </div>

      <div className="flex flex-col gap-4 p-5">
        <h3 className="font-[500] text-[15px] leading-[15px]">Categories</h3>
        <div className="flex flex-col gap-2">
          {mediums.map((item) => (
            <div
              key={item}
              className="grid grid-cols-2 gap-2 items-center capitalize"
            >
              <label
                className="text-xs leading-[12px] font-[300]"
                htmlFor={item}
              >
                {item.replace(/-/g, " ")}
              </label>
              <input
                id={item}
                type="checkbox"
                name={item}
                value={item}
                className="w-[12px] h-[12px]"
                checked={filters?.includes(item)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilter([...filters, item]);
                  } else {
                    setFilter(filters?.filter((f) => f !== item));
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 p-5">
        <h3 className="font-[500] text-[15px] leading-[15px]">Price Range</h3>
        <Slider
          value={priceRange}
          onChange={(e, value: number[]) => {
            setPriceRange(value);
            // setFilter({
            //   ...filters,
            //   price: {
            //     min: value[0],
            //     max: value[1],
            //   },
            // });
          }}
          valueLabelDisplay="auto"
        >
          <span className="w-[11px] h-[11px]"></span>
          <span className="w-[11px] h-[11px]"></span>
          <span className="w-[11px] h-[11px]"></span>
        </Slider>
      </div>
    </aside>
  );
};

export default FilterComponent;
