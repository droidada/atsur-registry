import Layout from "@/components/open9/layout/Layout";
import FeaturedItem5 from "@/components/open9/sections/FeaturedItem5";
import FeaturedItem6 from "@/components/open9/sections/FeaturedItem6";
import Seller7 from "@/components/open9/sections/Seller7";
import TopCollections5 from "@/components/open9/sections/TopCollections5";
import React from "react";
import { getToken } from "next-auth/jwt";
import axios from "@/lib/axios";
import Link from "next/link";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const id = query?.id;
    // const token: any = await getToken({
    //   req,
    //   secret: process.env.NEXTAUTH_SECRET,
    // });
    const res = await axios.get(`/user/artist/${id}`);
    console.log("resss", res);

    return { props: { user: res.data.user } };
  } catch (error) {
    console.error("error here looks like ", error);
    if (error?.response?.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error(error);
  }
};

const Index = ({ user }) => {
  console.log("userrr", user);

  return (
    <Layout headerStyle={2} footerStyle={1}>
      <div className="w-full py-20 px-[0px] md:px-[170px]">
        <div className="w-full flex flex-col gap-8 relative ">
          <div
            className="md:w-full h-[150px] md:h-[300px]"
            style={{
              // height: "300px",
              background: `${user?.backgroundImage}`,
              backgroundSize: "cover",
              backgroundColor: "#DEE8E8",
            }}
          >
            {user?.backgroundImage && (
              <img
                src={
                  user?.backgroundImage
                    ? user?.backgroundImage
                    : "/assets/default-image.jpg"
                }
                alt="profile"
                className=""
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </div>
          <img
            src={user?.avatar ? user?.avatar : "/assets/default-image.jpg"}
            alt="profile"
            className=" mt-[-70px] md:mt-[-150px] p-6 w-[100px] md:w-[250px] h-[100px]  md:h-[250px]"
            style={{ borderRadius: "50%" }}
          />
          <div className="mt-[-60px] md:mt-[-120px] ml-[100px] md:ml-[250px] mb-12">
            <p className="font-bold text-3xl md:text-xl">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-lg">{user?.email}</p>
            <p className="text-lg">{user?.bio}</p>
          </div>
          <div className="mt-[-110px] md:mt-[-120px] self-end mb-12 flex gap-4">
            <Link href="#" id="connectbtn" className="tf-button style-1">
              <span>Follow</span>
            </Link>
          </div>
          <div className="h-full">
            <div className="w-full h-full">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div className="flex gap-4">
                  <p className="text-grey-500 text-xl">Twitter:</p>
                  <p className="text-black text-xl">
                    {user?.socialLinks?.twitter}
                  </p>
                </div>
                <div className="flex gap-4">
                  <p className="text-grey-500 text-xl">Facebook</p>
                  <p className="text-black text-xl">
                    {user?.socialLinks?.facebook}
                  </p>
                </div>
                <div className="flex gap-4">
                  <p className="text-grey-500 text-xl">Instagram</p>
                  <p className="text-black text-xl">
                    {user?.socialLinks?.instagram}
                  </p>
                </div>
                <div className="flex gap-4">
                  <p className="text-grey-500 text-xl">LinkedIn</p>
                  <p className="text-black text-xl">
                    {user?.socialLinks?.linkedIn}
                  </p>
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
