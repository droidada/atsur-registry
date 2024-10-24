import React from "react";
import HeroSection from "./HeroSection";
import CategorySection from "./CategorySection";
import IHomepageData from "@/types/models/hompageData";
import TopArtists from "./TopArtists";
import JoinUs from "./JoinUs";
import Featured from "./Featured";
import TopCollection from "./TopCollection";

interface Props {
  heroImages: string[];
}
const HomePage: React.FC<Props> = ({ heroImages }) => {
  return (
    <div className=" py-12 ">
      <HeroSection heroImages={heroImages} />
      <CategorySection />
      <TopArtists />
      <Featured />
      <TopCollection />
      <JoinUs />
    </div>
  );
};

export default HomePage;
