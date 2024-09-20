import LandingPageLayout from "@/components/layout/LandingPage";
import Image from "next/image";
import React from "react";
import { Button } from "@mui/material";
import TrustedComponents from "@/components/ServicesPage/TrustedComponent";
import axios from "@/lib/axios";
import { getToken } from "next-auth/jwt";
import ComingSoonComponent from "@/components/ServicesPage/ComingSoonComponent";
import Link from "next/link";
export const getServerSideProps = async ({ req, query }) => {
  try {
    const token: any = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const res = await axios.get(`/public/explore?limit=4&page=1`, {
      headers: { authorization: `Bearer ${token?.accessToken}` },
    });

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
  return (
    <LandingPageLayout>
      <div className="bg-secondary">
        <div className="flex gap-24 flex-col md:flex-row max-w-[80%] justify-center w-full mx-auto py-12 items-center">
          <div
            className="flex flex-col items-center md:items-start gap-4"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <h1 className="text-5xl md:text-7xl">Archiving</h1>
            <Link className="max-w-[146px] w-full" href="/signup">
              <Button
                variant="contained"
                className="text-white px-2 font-[400] mt-4 max-w-[146px] w-full h-[47px] bg-primary"
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="1000"
              >
                Sign Up
              </Button>
            </Link>
          </div>
          <div
            className="relative"
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="300"
          >
            <div className="w-[326px] h-[326px] flex justify-center items-center rounded-full bg-white">
              <Image
                src="/assets/images/services/archiving/hero.svg"
                alt="Archiving Hero"
                width={190}
                height={190}
              />
              <div className="absolute right-0 top-0 w-[26px] h-[26px] rounded-full bg-white"></div>
              <div className="absolute right-[-20%] bottom-0 w-[79px] h-[79px] rounded-full bg-white"></div>
            </div>
          </div>
        </div>
      </div>

      <section className="flex flex-col items-center px-4 gap-8 pb-12">
        <div
          className="flex justify-center md:gap-24 flex-col md:flex-row items-center"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <Image
            src={"/assets/images/services/archiving/catalog.svg"}
            width={232}
            height={232}
            alt="catalog"
          />
          <div className="flex flex-col gap-2 md:text-left text-center max-w-[451px] w-full">
            <h2 className="text-4xl font-bold">CATALOG</h2>
            <p className="text-xl">
              Have all your art documentation in one place.
            </p>
          </div>
        </div>

        <div
          className="flex justify-center md:gap-24 flex-col-reverse md:flex-row items-center"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <div className="flex flex-col md:text-left text-center gap-2 max-w-[451px] w-full">
            <h2 className="text-4xl uppercase font-bold">Own your narrative</h2>
            <p className="text-xl">
              Tell the story behind each piece. Attach creator videos and
              stories to your artwork.
            </p>
          </div>
          <Image
            src={"/assets/images/services/archiving/narrative.svg"}
            width={242}
            height={242}
            alt="narrative"
          />
        </div>
      </section>

      <ComingSoonComponent />

      <section className="flex flex-col my-10 mx-auto w-fit items-center">
        {/* <div
          className="w-full max-w-[1000px] mx-auto mb-[80px] h-[1px] bg-primary"
          data-aos="fade-right"
          data-aos-duration="1000"
        /> */}

        <div
          className="flex flex-col md:flex-row items-stretch"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="300"
        >
          <div className="bg-primary flex flex-col p-10">
            <h2 className="text-2xl uppercase text-white font-bold">
              Share your pieces
            </h2>
            <p className="max-w-[487px] leading-[57px] font-[300] w-full text-4xl text-white">
              Custom shareable urls archived forever
            </p>
            <Link className="max-w-[150px] w-full" href="/signup">
              <Button
                variant="contained"
                className="text-primary h-[47px] w-[150px] bg-white text-[16px] leading-[14px] font-[400] mt-4"
                data-aos="fade-up"
                data-aos-delay="400"
                data-aos-duration="1000"
              >
                Sign Up
              </Button>
            </Link>
          </div>
          <Image
            src={"/images/archiving/share.png"}
            width={368}
            height={368}
            alt="Share"
            className="w-full md:w-[368px] h-[368px] object-cover"
          />
        </div>
      </section>

      <section className="bg-secondary">
        <div className="page-container py-10">
          <div
            className="flex justify-center md:gap-24 flex-col md:flex-row items-center"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <Image
              src={"/assets/images/services/archiving/track.svg"}
              width={262}
              height={262}
              alt="track"
            />
            <div className="flex flex-col gap-2 md:text-left text-center max-w-[451px] w-full">
              <h2 className="text-4xl uppercase font-bold">Track</h2>
              <p className="text-2xl">Track your art sales and activities</p>
            </div>
          </div>

          <div
            className="flex justify-center md:gap-24 flex-col-reverse md:flex-row items-center"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            <div className="flex flex-col md:text-left text-center gap-2 max-w-[451px] w-full">
              <h2 className="text-4xl uppercase font-bold">Access Control</h2>
              <p className="text-2xl">
                Control who views your work and their access levels
              </p>
            </div>
            <Image
              src={"/assets/images/services/archiving/access-control.svg"}
              width={271}
              height={271}
              alt="access-control"
            />
          </div>
        </div>
      </section>

      <TrustedComponents artworkData={artPieces} />
    </LandingPageLayout>
  );
};

export default Archiving;
