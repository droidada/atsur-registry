import { Button } from "@mui/material";
import React from "react";

interface Props {
  setFilters: React.Dispatch<
    React.SetStateAction<{
      gender: string;
      verificationStatus: string;
    }>
  >;
  filters: {
    gender: string;
    verificationStatus: string;
  };
}
const ArtistFilters: React.FC<Props> = ({ setFilters, filters }) => {
  return (
    <aside className="hidden md:flex sticky left-0 top-0 flex-col w-full max-w-[281px] bg-secondary-white ">
      <div className="py-5 px-5 border-b-[1px] border-primary text-[18px] leading-[15px] flex justify-between items-center gap-4">
        <p
          className={`text-[18px] leading-[15px]  font-bold

          `}
        >
          Filter
        </p>
        <Button
          onClick={() => setFilters({ gender: "", verificationStatus: "" })}
          variant="text"
          className={`text-[18px] leading-[15px] bg-black text-white
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
              onChange={() =>
                setFilters({
                  ...filters,
                  gender: "male",
                })
              }
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
              value={filters.gender}
              id="female"
              className="ring-0 focus:ring-0 outline-none"
              name="gender"
              onChange={() =>
                setFilters({
                  ...filters,
                  gender: "female",
                })
              }
              type="radio"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-5">
        <h3 className="font-[500] text-[15px] leading-[15px]">
          Verification Status
        </h3>
        <div className="flex gap-4">
          <div className="flex gap-2 items-center">
            <label
              htmlFor="verified"
              className="text-xs leading-[12px] font-[300]"
            >
              Verified
            </label>
            <input
              id="verified"
              name="verification-status"
              className="ring-0 fouc:ring-0 outline-none"
              value={filters.verificationStatus}
              onChange={() => {
                setFilters({
                  ...filters,
                  verificationStatus: "verified",
                });
              }}
              type="radio"
            />
          </div>
          <div className="flex gap-2 items-center">
            <label
              htmlFor="not-verified"
              className="text-xs leading-[12px] font-[300]"
            >
              Not Verified
            </label>
            <input
              id="not-verified"
              className="ring-0 focus:ring-0 outline-none"
              name="verification-status"
              value={filters.verificationStatus}
              onChange={() => {
                setFilters({
                  ...filters,
                  verificationStatus: "not-verified",
                });
              }}
              type="radio"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ArtistFilters;
