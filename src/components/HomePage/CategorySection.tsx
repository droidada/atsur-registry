import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";
import { ICategory } from "@/types/models/hompageData";
import CategoryCard from "../CategoryCard";
import { axiosAuth as axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface Props {}
const CategorySection: React.FC<Props> = ({}) => {
  const { data, isLoading } = useQuery({
    queryFn: () => axios.get("/public/top-categories"),
    queryKey: ["top-categories"],
    refetchOnWindowFocus: false,
  });

  console.log(data?.data);
  return (
    <Stack
      component={"section"}
      className="md:mt-20 mt-8 mb-6 page-container"
      direction={"column"}
      justifyContent={"center"}
      spacing={4}
      data-aos="fade-up"
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-[250px]">
          <CircularProgress color="primary" size={20} />
        </div>
      ) : (
        <>
          <Typography
            className="text-[17px] leading-[16px] font-[400]"
            data-aos="fade-right"
          >
            Browse by <span className="font-[600]">Category</span>
          </Typography>
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems={{ xs: "center", md: "stretch" }}
            spacing={2}
            data-aos="fade-up" // Fade-up animation for category cards
          >
            {data?.data?.categories.map((category) => (
              <CategoryCard
                url={`/category/${category?._id}`}
                category={category}
                key={category?._id}
                dataAos="zoom-in"
                dataAosDelay={data?.data?.categories.indexOf(category) * 100}
              />
            ))}
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default CategorySection;
