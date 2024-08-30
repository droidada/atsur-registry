import { Stack, Typography } from "@mui/material";
import React from "react";
import { ICategory } from "@/types/models/hompageData";
import CategoryCard from "../CategoryCard";

interface Props {}
const CategorySection: React.FC<Props> = ({}) => {
  return (
    <Stack
      component={"section"}
      className="md:mt-20 mt-8 mb-6 page-container"
      direction={"column"}
      justifyContent={"center"}
      spacing={4}
    >
      <Typography className="text-[17px] leading-[16px] font-[400]">
        Browse by <span className="font-[600]">Category</span>
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "center", md: "stretch" }}
        spacing={2}
      >
        {/* {categories?.slice(0, 4)?.map((category) => (
          <CategoryCard
            url={`/category/${category?._id}`}
            category={category}
            key={category?._id}
          />
        ))} */}
      </Stack>
    </Stack>
  );
};

export default CategorySection;
