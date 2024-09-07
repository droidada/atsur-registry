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

const CertificatesOfAuthenticity = ({ artPieces }) => {
  return (
    <PricingLayout
      HeroSection={
        <div className="flex gap-4 flex-col md:flex-row  justify-center py-12 items-center">
          <div className="flex md:text-left text-center max-w-[556px] w-full flex-col items-center md:items-start gap-4 ">
            <h1 className="text-5xl lg:text-[80px] lg:leading-[65px]  ">
              Certificate of Authenticity
            </h1>
            <p className="font-[300] text-[31px] leading-[35px] max-w-[428px] w-full">
              Defend your artwork against fraud
            </p>
            <Button
              variant="contained"
              className="text-white px-2 font-[400] mt-4 max-w-[146px] w-full h-[47px] bg-primary"
            >
              Create
            </Button>
          </div>
          <div className="relative overflow-x-hidden md:overflow-visible">
            <Image
              src="/images/catalog/certificate-hero.png"
              alt="catalog"
              width={562.51}
              height={592}
              className="relative "
            />
          </div>
        </div>
      }
    >
      <section className="py-10 max-w-[1000px] mx-auto">
        <h2 className="text-center max-w-[918px] w-full  font-[300] text-[47px]">
          Register your certificates of authenticity on the blockchain
        </h2>
        <div className="flex gap-6 mt-10">
          <div className="flex gap-4 items-start">
            <Image
              src={"/images/catalog/define.png"}
              width={153}
              height={161}
              alt=""
            />
            <div className="flex flex-col gap-2 max-w-[341px] w-full">
              <h3 className="font-bold border-b-[1px]  text-[24px] pb-2 border-primary">
                Define
              </h3>
              <p className="font-[300] text-[27px] leading-[35px]">
                Choose between unique works or editions
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <Image
              src={"/images/catalog/register.png"}
              width={153}
              height={161}
              alt=""
            />
            <div className="flex flex-col gap-2 max-w-[341px] w-full">
              <h3 className="font-bold border-b-[1px]  text-[24px] pb-2 border-primary">
                Register
              </h3>
              <p className="font-[300] text-[27px] leading-[35px]">
                Register your certificate of authenticity
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col my-10 mx-auto  w-fit items-center">
        <div className="w-full max-w-[1000px] mx-auto mb-[80px] h-[1px] bg-primary" />

        <div className="flex flex-col md:flex-row  items-stretch">
          <div className="bg-primary flex flex-col  justify-center p-10">
            <p className="max-w-[487px] leading-[63px] font-[300] w-full text-[67px] text-white">
              Digital signature
            </p>
            <Button
              variant="contained"
              className="text-primary h-[47px] w-[150px] bg-white  text-[16px] leading-[14px] font-[400] mt-4"
            >
              Create
            </Button>
          </div>
          <Image
            src={"/images/catalog/signature.png"}
            width={506}
            height={368}
            alt=""
            className="w-full md:w-[368px] h-[368px] object-cover"
          />
        </div>
      </section>

      <section className="bg-secondary py-10">
        <div className="max-w-[1000px] w-full mx-auto">
          <h2 className="text-center  text-[24px] leading-[65px] font-bold">
            Certificates
          </h2>
          <div
            className="flex flex-col gap-8
           mt-10 md:flex-row  items-stretch"
          >
            <Image
              src={"/images/catalog/certificate.png"}
              width={475}
              height={475}
              alt=""
            />
            <div className="flex flex-col max-w-[404px] w-full gap-4">
              <div className="flex gap-4 border-b-[1px] border-primary ">
                {["Holographic", "Regular"].map((item, index) => (
                  <div
                    key={item}
                    className={`text-[31px] leading-[63px] font-[300] ${
                      index === 0 ? "text-primary" : "text-[#2D2D2D]"
                    } pb-3 relative`}
                  >
                    {item}
                    {index === 0 && (
                      <span className="absolute right-0 bottom-0 h-[2px] bg-primary w-full" />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-[27px] leading-[35px] mt-5 font-[300]">
                Choose between two unique types of certificates
              </p>
              <Button
                variant="contained"
                className="text-[16px] bg-primary text-white leading-[14px] font-[400] h-[47px] w-[197px]"
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </section>
      <TrustedComponents artworkData={artPieces} />
    </PricingLayout>
  );
};

export default CertificatesOfAuthenticity;
