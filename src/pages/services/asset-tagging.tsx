import ComingSoonComponent from "@/components/ServicesPage/ComingSoonComponent";
import TrustedComponents from "@/components/ServicesPage/TrustedComponent";
import LandingPageLayout from "@/components/layout/LandingPage";
import axios from "@/lib/axios";
import { Button } from "@mui/material";
import { getToken } from "next-auth/jwt";
import Image from "next/image";
import React from "react";

interface TagOptionProps {
  title: string;
  items: string[];
  imageSrc: string;
}

interface InfoSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  reverse?: boolean;
}

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
    if (error?.response?.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error(error);
  }
};

const InfoSection: React.FC<InfoSectionProps> = ({
  title,
  description,
  imageSrc,
  reverse,
}) => {
  return (
    <div
      className={`flex justify-center items-center flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } md:gap-24 py-8`}
      data-aos="fade-up"
    >
      <Image src={imageSrc} width={198} height={198} alt={title} />
      <div className="flex flex-col gap-2 md:text-left text-center max-w-[451px] w-full">
        <h2 className="text-[24px] leading-[65px] tracking-[74%] font-bold">
          {title.toUpperCase()}
        </h2>
        <p className="text-[29px] leading-[37px] font-[300]">{description}</p>
      </div>
    </div>
  );
};

const TagOption: React.FC<TagOptionProps> = ({ title, items, imageSrc }) => (
  <div className="flex gap-4 items-stretch" data-aos="fade-right">
    <Image src={imageSrc} width={153} height={161} alt={title} />
    <div className="flex flex-col gap-2 max-w-[341px] w-full">
      <h3 className="font-bold border-b-[1px] text-[24px] pb-2 border-primary">
        {title}
      </h3>
      <ul className="font-[300] ml-5 list-disc text-[27px] leading-[35px]">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
);
const AssetTagging = ({ artPieces }) => {
  return (
    <LandingPageLayout>
      <div className="bg-secondary">
        <div className="flex gap-4 flex-col md:flex-row justify-center py-12 items-center">
          <div
            className="flex md:text-left text-center max-w-[556px] w-full flex-col items-center md:items-start gap-4"
            data-aos="fade-up"
          >
            <h1 className="text-5xl lg:text-[80px]">Asset Tagging</h1>
            <p className="font-[300] text-[31px] leading-[35px]">
              Physically attach tags to your art pieces to allow tracking,
              identification, and management of the artwork.
            </p>
            <div
              className="flex gap-2 w-full justify-center"
              data-aos="fade-up"
            >
              <input
                type="email"
                placeholder="Your email here"
                className="border m focus:border-none focus:outline-none"
              />
              <Button className="bg-primary text-white">
                Get notified when this feature is active
              </Button>
            </div>
          </div>
          <div className="relative" data-aos="zoom-in">
            <div className="w-[326px] h-[326px] flex justify-center items-center rounded-full bg-white">
              <Image
                src="/assets/images/services/asset-tagging/hero.svg"
                alt="catalog"
                width={219}
                height={219}
                className="relative"
              />
            </div>
            <div className="absolute right-0 top-0 w-[26px] h-[26px] rounded-full bg-white"></div>
            <div className="absolute right-[-20%] bottom-0 w-[79px] h-[79px] rounded-full bg-white"></div>
          </div>
        </div>
      </div>

      <section
        className="py-10 border-b-[1px] border-primary pb-12 px-4 max-w-[1000px] mx-auto"
        data-aos="fade-up"
      >
        <h2 className="text-center max-w-[918px] w-full mx-auto font-[300] text-[47px]">
          Enhance user experience and interaction with your piece with
          tamper-proof tags
        </h2>
        <div className="flex justify-center flex-wrap items-center gap-6 mt-10">
          <TagOption
            title="RFID Tags"
            items={["Regular", "Location tracking"]}
            imageSrc="/images/catalog/define.png"
          />
          <TagOption
            title="QR Stickers"
            items={["Regular", "Holographic"]}
            imageSrc="/images/catalog/register.png"
          />
        </div>
      </section>

      <ComingSoonComponent />

      <section
        className="flex flex-col items-center px-4 gap-8 pb-12"
        data-aos="fade-up"
      >
        <InfoSection
          title="Easy Tracking"
          description="Make your ownership document tamper-proof. Provide solid proof of the artwork's authenticity, provenance, and ownership history."
          imageSrc="/assets/images/services/asset-tagging/tracking.svg"
        />
        <InfoSection
          title="Quick Identification"
          description="Retrieve information about your art piece by simply scanning the codes, saving time and effort."
          imageSrc="/assets/images/services/asset-tagging/biometrics.svg"
          reverse
        />
        <InfoSection
          title="Secure Authentication"
          description="Tie documents and digital information with tamper-proof tags to verify art origin, ownership, and history, preventing counterfeiting or theft."
          imageSrc="/assets/images/services/asset-tagging/authentication.svg"
        />
      </section>

      <TrustedComponents artworkData={artPieces} />
    </LandingPageLayout>
  );
};

export default AssetTagging;
