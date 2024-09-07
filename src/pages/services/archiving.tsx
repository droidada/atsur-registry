import TrustedComponents from "@/components/ServicesPage/TrustedComponent";
import PricingLayout from "@/components/layout/PricingLayout";
import { axiosAuth as axios } from "@/lib/axios";
import { Button } from "@mui/material";
import { getToken } from "next-auth/jwt";
import Image from "next/image";
import React from "react";

export const getServerSideProps = async ({ req, query }) => {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const res = await axios.get(`/public/explore?limit=4&page=1`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

    console.log("res here ", res?.data?.artPieces);

    return { props: { artPieces: res?.data?.artPieces } };
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

const Archiving = ({ artPieces }) => {
  console.log(artPieces);
  return (
    <PricingLayout
      HeroSection={
        <div className="flex gap-24 flex-col md:flex-row overflow-x-hidden justify-center py-12 items-center">
          <div className="flex flex-col items-center md:items-start gap-4 ">
            <h1 className="text-5xl lg:text-[80px] lg:leading-[65px]  ">
              Archiving
            </h1>
            <Button
              variant="contained"
              className="text-white px-2 font-[400] mt-4 max-w-[146px] w-full h-[47px] bg-primary"
            >
              Create
            </Button>
          </div>
          <div className="relative">
            <Image
              src="/images/archiving/vector-1.svg"
              alt=""
              width={309}
              height={330}
              className="absolute left-0 -top-4"
            />
            <Image
              src="/images/archiving/vector-4.png"
              alt="archiving"
              width={345}
              height={364}
              className="absolute top-2 left-0"
            />
            <Image
              src="/images/archiving/blue-folder.svg"
              alt="archiving"
              width={351}
              height={378}
              className="relative"
            />

            <Image
              src="/images/archiving/vector-2.svg"
              alt=""
              width={34}
              height={30}
              className="absolute top-0 left-0 md:block hidden"
            />
            <Image
              src="/images/archiving/vector-3.svg"
              alt=""
              width={35}
              height={37}
              className="absolute bottom-0 -right-10"
            />
            <Image
              src="/images/archiving/vector-4.svg"
              alt=""
              width={34}
              height={30}
              className="absolute top-0"
            />
            <Image
              src="/images/archiving/vector-2.svg"
              alt=""
              width={34}
              height={30}
              className="absolute top-0 left-0"
            />
            <Image
              src="/images/archiving/vector.svg"
              alt=""
              width={76}
              height={79}
              className="absolute top-1/3 -right-1/3"
            />
          </div>
        </div>
      }
    >
      <section className="flex flex-col items-center px-4 gap-8 pb-12">
        <div className="flex justify-center md:gap-24 flex-col md:flex-row items-center">
          <Image
            src={"/images/archiving/catalog.svg"}
            width={386}
            height={386}
            alt="catalog"
          />
          <div className="flex flex-col gap-2 md:text-left text-center max-w-[451px] w-full">
            <h2 className="text-[24px] leading-[65px] tracking-[74%] font-bold">
              CATALOG
            </h2>
            <p className="text-4xl lg:text-[47px] lg:leading-[57px]">
              Have all your art documentation in one place.
            </p>
          </div>
        </div>
        <div className="flex justify-center md:gap-24 flex-col-reverse md:flex-row items-center">
          <div className="flex flex-col md:text-left text-center gap-2 max-w-[451px] w-full">
            <h2 className="text-[24px] uppercase leading-[65px] tracking-[74%] font-bold">
              Own your narrative 
            </h2>
            <p className="text-4xl lg:text-[47px] lg:leading-[57px]">
              Tell the story behind each piece. Attach creator videos and
              stories to your artwork.
            </p>
          </div>
          <Image
            src={"/images/archiving/narative.svg"}
            width={386}
            height={372}
            alt="catalog"
          />
        </div>
      </section>

      <section className="flex flex-col my-10 mx-auto  w-fit items-center">
        <div className="w-full max-w-[1000px] mx-auto mb-[80px] h-[1px] bg-primary" />

        <div className="flex flex-col md:flex-row  items-stretch">
          <div className="bg-primary flex flex-col p-10">
            <h2 className="text-2xl uppercase leading-[65px] tracking-[61%] text-white font-bold">
              Share your pieces
            </h2>
            <p className="max-w-[487px] leading-[57px] font-[300] w-full text-[47px] text-white">
              Custom shareable urls archived forever
            </p>
            <Button
              variant="contained"
              className="text-primary h-[47px] w-[150px] bg-white  text-[16px] leading-[14px] font-[400] mt-4"
            >
              Create
            </Button>
          </div>
          <Image
            src={"/images/archiving/share.png"}
            width={368}
            height={368}
            alt=""
            className="w-full md:w-[368px] h-[368px] object-cover"
          />
        </div>
      </section>

      <section className="bg-secondary">
        <div className="page-container py-10">
          <div className="flex justify-center md:gap-24 flex-col md:flex-row items-center">
            <Image
              src={"/images/archiving/track.svg"}
              width={361}
              height={378}
              alt="track"
            />
            <div className="flex flex-col gap-2 md:text-left text-center max-w-[451px] w-full">
              <h2 className="text-[24px] uppercase leading-[65px] tracking-[74%] font-bold">
                Track
              </h2>
              <p className="text-4xl lg:text-[47px] lg:leading-[57px]">
                Track your art sales and activities
              </p>
            </div>
          </div>
          <div className="flex justify-center md:gap-24 flex-col-reverse md:flex-row items-center">
            <div className="flex flex-col md:text-left text-center gap-2 max-w-[451px] w-full">
              <h2 className="text-[24px] uppercase leading-[65px] tracking-[74%] font-bold">
                Access Control
              </h2>
              <p className="text-4xl lg:text-[47px] lg:leading-[57px]">
                Control who views your work and their access levels
              </p>
            </div>
            <Image
              src={"/images/archiving/access-control.svg"}
              width={386}
              height={372}
              alt="catalog"
            />
          </div>
        </div>
      </section>

      <TrustedComponents artworkData={artPieces} />
    </PricingLayout>
  );
};

export default Archiving;
