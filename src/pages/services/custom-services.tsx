import ComingSoonComponent from "@/components/ServicesPage/ComingSoonComponent";
import TrustedComponents from "@/components/ServicesPage/TrustedComponent";
import LandingPageLayout from "@/components/layout/LandingPage";
import PricingLayout from "@/components/layout/PricingLayout";
import axios from "@/lib/axios";
import { Button } from "@mui/material";
import { getToken } from "next-auth/jwt";
import Image from "next/image";
import React from "react";

// export const getServerSideProps = async ({ req, query }) => {
//   try {
//     const token: any = await getToken({
//       req,
//       secret: process.env.NEXTAUTH_SECRET,
//     });
//     const res = await axios.get(`/public/explore?limit=4&page=1`, {
//       headers: { authorization: `Bearer ${token?.accessToken}` },
//     });

//     return { props: { artPieces: res?.data?.artPieces } };
//   } catch (error) {
//     console.error("error here looks like ", error);
//     if (error?.response?.status === 404) {
//       return {
//         notFound: true,
//       };
//     }
//     throw new Error(error);
//   }
// };

const CustomServices = ({ artPieces }) => {
  return (
    <LandingPageLayout>
      <section className="bg-secondary">
        <div className="flex gap-4 flex-col md:flex-row  justify-center py-12 items-center">
          <div
            className="flex md:text-left text-center max-w-[556px] w-full flex-col items-center md:items-start gap-4"
            data-aos="fade-right"
          >
            <h1 className="text-5xl lg:text-[80px]">Custom Services</h1>
            <p className="font-[300] text-[31px] leading-[35px]">
              Custom built archiving solutions platform including open APIs
              powered and managed by Atsur
            </p>
            <Button
              variant="contained"
              className="text-white px-2 font-[400] mt-4 max-w-[146px] w-full h-[47px] bg-primary"
              data-aos="fade-up"
            >
              Create
            </Button>
          </div>
          <div className="relative" data-aos="zoom-in">
            <div className="w-[326px] h-[326px] flex justify-center items-center rounded-full bg-white">
              <Image
                src="/assets/images/services/custom-services/custom-services.svg"
                alt="catalog"
                width={230}
                height={230}
                className="relative"
              />
            </div>
            <div className="absolute right-0 top-0 w-[26px] h-[26px] rounded-full bg-white"></div>
            <div className="absolute right-[-20%] bottom-0 w-[79px] h-[79px] rounded-full bg-white"></div>
          </div>
        </div>
      </section>

      <section
        className="flex gap-7 border-b-[1px] border-secondary max-w-[1015px] w-full mx-auto flex-wrap justify-center py-10 items-start"
        data-aos="fade-up"
      >
        <div className="flex gap-4 items-center" data-aos="fade-left">
          <Image
            alt="archives"
            src={"/assets/images/services/custom-services/archives.svg"}
            width={153}
            height={161}
          />
          <p className="font-[300] text-[27px] max-w-[176px] w-full leading-[35px]">
            Bespoke archives
          </p>
        </div>
        <div className="flex gap-4 items-center" data-aos="fade-right">
          <Image
            alt="shared-hosting"
            src={"/assets/images/services/custom-services/shared-hosted.svg"}
            width={153}
            height={161}
          />
          <p className="font-[300] text-[27px] max-w-[176px] w-full leading-[35px]">
            Self hosted or Shared hosting
          </p>
        </div>
      </section>

      <ComingSoonComponent />
      {/* <TrustedComponents artworkData={artPieces} /> */}
    </LandingPageLayout>
  );
};

export default CustomServices;
