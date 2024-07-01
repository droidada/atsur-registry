import { Button, Rating, Slider, SliderThumb } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
  filters: {
    medium: string[];
    rarity: string[];
    priceRange: {
      min: number;
      max: number;
    };
  };
  setFilter: Dispatch<any>;
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
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

const rarity = ["unique", "limited-edition", "open-edition", "unknown"];

const FilterComponent: React.FC<Props> = ({
  filters,
  setFilter,
  rating,
  setRating,
}) => {
  const [currentActionType, setCurrentActionType] = useState("filter");
  const [priceRange, setPriceRange] = useState([10, 1000000]);

  const marks = [
    {
      value: 10,
      label: "$10",
    },
    {
      value: 1000000,
      label: "$1,000,000",
    },
  ];
  const valueLabelFormat = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  console.log(filters);

  return (
    <aside className="hidden md:flex sticky min-h-screen left-0 top-0 flex-col w-full max-w-[281px] bg-secondary-white ">
      <div className="py-5 px-5 border-b-[1px] border-primary text-[18px] leading-[15px] flex justify-between items-center gap-4">
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
                checked={filters?.medium?.includes(item)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilter({
                      ...filters,
                      medium: [...filters.medium, item],
                    });
                  } else {
                    setFilter({
                      ...filters,
                      medium: filters.medium.filter((f) => f !== item),
                    });
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col max-w-[208px] w-full gap-4 p-5">
        <h3 className="font-[500] text-[15px] leading-[15px]">Price Range</h3>
        <Slider
          value={priceRange}
          min={10}
          max={1000000}
          step={10}
          marks={marks}
          valueLabelDisplay="auto"
          valueLabelFormat={valueLabelFormat}
          sx={{
            "& .MuiSlider-thumb": {
              borderRadius: 0,
            },
          }}
          onChange={(e, value: number[]) => {
            setPriceRange(value);
            setFilter({
              ...filters,
              priceRange: {
                min: value[0],
                max: value[1],
              },
            });
            // setFilter({
            //   ...filters,
            //   price: {
            //     min: value[0],
            //     max: value[1],
            //   },
            // });
          }}
        >
          <span className="w-[11px] rounded-none h-[11px]"></span>
          <span className="w-[11px] h-[11px] rounded-none"></span>
          <span className="w-[11px] h-[11px] rounded-none"></span>
        </Slider>
      </div>

      <div className="flex flex-col gap-4 p-5">
        <h3 className="font-[500] text-[15px] leading-[15px]">Rarity</h3>
        <div className="flex flex-col gap-2">
          {rarity.map((item) => (
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
                checked={filters?.rarity?.includes(item)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilter({
                      ...filters,
                      rarity: [...filters.rarity, item],
                    });
                  } else {
                    setFilter({
                      ...filters,
                      rarity: filters.rarity.filter((f) => f !== item),
                    });
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 p-5">
        <h3 className="font-[500] text-[15px] leading-[15px]">Rating</h3>
        <Rating value={rating} onChange={(_, value) => setRating(value)} />
      </div>
      <div className="flex flex-col gap-4 p-5">
        <h3 className="font-[500] text-[15px] leading-[15px]">Verified</h3>
        <div className="flex gap-4">
          <div className="flex gap-2 items-center">
            <label htmlFor="yes" className="text-xs leading-[12px] font-[300]">
              Yes
            </label>
            <input
              id="yes"
              name="verified"
              className="ring-0 fouc:ring-0 outline-none"
              onChange={() =>
                setFilter({
                  ...filters,
                  verification: true,
                })
              }
              type="radio"
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="no" className="text-xs leading-[12px] font-[300]">
              No
            </label>
            <input
              id="no"
              className="ring-0 fouc:ring-0 outline-none"
              name="verified"
              onChange={() =>
                setFilter({
                  ...filters,
                  verification: false,
                })
              }
              type="radio"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterComponent;
