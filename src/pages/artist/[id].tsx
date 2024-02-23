import Layout from "@/components/open9/layout/Layout";
import FeaturedItem5 from "@/components/open9/sections/FeaturedItem5";
import FeaturedItem6 from "@/components/open9/sections/FeaturedItem6";
import Seller7 from "@/components/open9/sections/Seller7";
import TopCollections5 from "@/components/open9/sections/TopCollections5";
import React from "react";

const Index = () => {
  return (
    <Layout headerStyle={2} footerStyle={1}>
      <div className="w-full py-40 px-80">
        <div className="w-full flex md:flex-row flex-col gap-8 ">
          <div className="widget-login flex-1">
            <img src="/assets/default.jpeg" alt="profile" width="100%" />
          </div>
          <div className="flex-1 h-full">
            <div className="w-full h-full">
              <div className="widget-login w-full flex flex-col gap-6">
                <div className="flex gap-4">
                  <p className="text-grey-500">First Name:</p>
                  <p className="to-white">Samuel</p>
                </div>
                <div className="flex gap-4">
                  <p className="text-grey-500">Last Name:</p>
                  <p className="to-white">Nnaji</p>
                </div>
                <div className="flex gap-4">
                  <p className="text-grey-500">Email:</p>
                  <p className="to-white">example@gmail.com</p>
                </div>
                <div className="flex gap-4">
                  <p className="text-grey-500">Organization:</p>
                  <p className="to-white">example@gmail.com</p>
                </div>
                <div className="flex gap-4">
                  <p className="text-grey-500">No of Artworks:</p>
                  <p className="to-white">5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FeaturedItem6 />
      <TopCollections5 />
    </Layout>
  );
};

export default Index;
