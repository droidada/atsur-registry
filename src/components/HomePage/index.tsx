import React from "react";
import HeroSection from "./HeroSection";
import CategorySection from "./CategorySection";
import IHomepageData from "@/types/models/hompageData";
import TopArtists from "./TopArtists";
import JoinUs from "./JoinUs";
import Featured from "./Featured";
import TopCollection from "./TopCollection";

interface Props {
  pageData: IHomepageData;
}
const HomePage: React.FC<Props> = ({ pageData }) => {
  return (
    <>
      <HeroSection />
      <CategorySection categories={pageData.allPieces[0].categories} />
      <TopArtists artists={pageData.artists} />
      <Featured featured={pageData.artPieces} />
      <TopCollection artpieces={pageData.artPieces} />
      <JoinUs />
    </>
  );
};

export default HomePage;
