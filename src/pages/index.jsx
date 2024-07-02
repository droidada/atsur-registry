import PricingLayout from "@/components/layout/PricingLayout";
import { Button } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import {
  BsArrowRightCircleFill,
  BsArrowUpCircleFill,
  BsArrowUpLeftCircleFill,
  BsArrowUpRightCircleFill,
} from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa";
import { PiArrowCircleUpRightFill, PiBracketsCurlyBold } from "react-icons/pi";

const whatwedo = [
  {
    title: "Asset Tracking and Management",
    Icon: <FaDollarSign />,
    content: `ATSUR provides a seamless and efficient platform for tracking and managing art assets on the blockchain, ensuring secure sale, resale, royalties, and future tracking. With our custom protocols, we upscale the valuation of art and standardize records across the Afrocentric art ecosystem.
`,
    color: "#000000",
  },

  {
    Icon: <PiBracketsCurlyBold />,
    title: "Data Integrity",
    content: ``,
    color: "#444444",
  },
  {
    Icon: (
      <Image
        src="/images/homepage/africa-icon.png"
        alt="africa"
        width={40}
        height={40}
      />
    ),
    title: "African Focus",
    content: ``,
    color: "#656565",
  },
  {
    Icon: (
      <Image
        src="/images/homepage/padding.png"
        alt="padding"
        width={40}
        height={40}
      />
    ),
    title: "Democratized",
    content: ``,
    color: "#898989",
  },
  {
    Icon: (
      <Image
        src="/images/homepage/people.png"
        alt="people"
        width={40}
        height={40}
      />
    ),
    title: "Our Community",
    content: ``,
    color: "#9D9D9D",
  },
];

const services = [
  {
    title: "Due Diligence",
    image: "/images/homepage/diligence.png",
    color: "#fff",
  },
  {
    title: "Cataloging and Asset Management",
    image: "/images/homepage/catalogue.png",
    color: "#000",
  },
  {
    title: "Provenance Tracking",
    image: "/images/homepage/tracking.png",
    color: "#000",
  },
  {
    title: "Royalties",
    image: "/images/homepage/royalties.png",
    color: "#fff",
  },
  {
    title: "Customer Engagement",
    image: "/images/homepage/handshake.png",
    color: "#fff",
  },
];

const team = [
  {
    image: "/images/homepage/smith.png",
    name: "Emily Smith",
    designation: "Blockchain Specialist",
  },
  {
    image: "/images/homepage/sophia.png",
    name: "Sophia Johnson",
    designation: "Art Valuation Expert ",
  },
  {
    image: "/images/homepage/smith.png",
    name: "Sophia Johnson",
    designation: "Art Valuation Expert ",
  },
];
const Homepage = () => {
  const [currentView, setCurrentView] = useState(0);

  return (
    <PricingLayout
      HeroSection={
        <div>
          <div className="py-12 flex items-center flex-col">
            <div className="flex flex-col items-center text-[50px] text-center">
              <h1 className="font-bold ">Introducing ATSUR</h1>
              <h2>The Future of Afrocentric Art</h2>
            </div>
            <p className="text-center mt-2 text-[20px] max-w-[557px] w-full">
              Automating art due diligence processes to revolutionize the
              Afrocentric art ecosystem through blockchain technology.
            </p>
            <div className="flex flex-wrap px-4 relative md:top-20 items-center gap-8">
              {[
                "/images/homepage/hero-2.png",
                "/images/homepage/hero-1.png",
                "/images/homepage/hero-3.png",
              ].map((items, image) => (
                <Image
                  key={image}
                  src={items}
                  alt=""
                  width={280}
                  height={280}
                />
              ))}
            </div>
          </div>
          <div className="w-full h-[250.32px] flex justify-center flex-col items-center relative ">
            <Image
              fill
              src="/images/homepage/atsur-pattern.png"
              className="object-cover"
              alt=""
            />
            <div className="relative flex gap-10">
              <Button
                variant="contained"
                className="bg-primary text-[15px] font-[400] w-[140.21px] h-[43.43px]  text-white"
              >
                Explore
              </Button>
              <Button
                variant="contained"
                className="bg-[#DEDEDE]  text-[15px] font-[400] w-[140.21px] h-[43.43px]  text-primary"
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      }
    >
      {/*-------------- PARTNERS ------------*/}
      <section className="py-10">
        <div className=" page-container  ">
          <div className="flex justify-between md:px-10 flex-wrap items-center  gap-14">
            <h3 className="text-[26px]">Our Partners</h3>
            <div className="flex flex-wrap items-center gap-10">
              {[...Array(6)].map((_, index) => (
                <div
                  key={`partners-${index}`}
                  className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full bg-[#C3C3C3]"
                ></div>
              ))}
            </div>
          </div>

          <div className="flex page-container items-center justify-center mt-20 gap-4">
            <h2 className="text-[50px] font-[300]">Why We stand Out</h2>
            <PiArrowCircleUpRightFill size={95} />
          </div>
          <div className="page-container flex flex-col items-center mt-10">
            <div className="flex page-container flex-col-reverse md:flex-row  justify-center gap-6 mt-8 items-center ">
              <div className="relative w-full overflow-x-auto flex">
                {whatwedo?.map((item, index) => (
                  <div
                    onClick={() => {
                      if (currentView !== index) {
                        setCurrentView(index);
                      }
                    }}
                    key={`whatwedo-${index}`}
                    style={{
                      backgroundColor: item.color,
                    }}
                    className={`h-[505px] flex-shrink-0 duration-700 ${
                      currentView === index
                        ? "flex-1   justify-between"
                        : "w-[140.5px] justify-end"
                    }  flex flex-col text-white p-6`}
                  >
                    {currentView === index && (
                      <h3 className="text-[26px] ">{item?.title}</h3>
                    )}
                    <div className="text-4xl">{item.Icon}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-row md:flex-col duration-700 justify-center gap-3 items-center">
                {[...Array(whatwedo.length)].map((_, index) => (
                  <div
                    onClick={() => {
                      if (currentView !== index) {
                        setCurrentView(index);
                      }
                    }}
                    key={`dots-${index}`}
                    className={`cursor-pointer grid place-items-center w-[15px] h-[15px] rounded-full ${
                      currentView === index
                        ? "border-[0.5px] border-primary"
                        : "bg-[#e8e7e7]"
                    }`}
                  >
                    {currentView === index && (
                      <div className="w-[80%] h-[80%] rounded-full bg-primary"></div>
                    )}{" "}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex md:flex-row flex-col-reverse min-h-[250px] px-5 justify-between mt-10 gap-20 w-full  items-start ">
              <p className=" max-w-[720px] w-full text-[23px]">
                {whatwedo[currentView]?.content}
              </p>
              <div className="text-5xl">
                {currentView + 1} / {whatwedo.length}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*--------- VISION -----------------*/}
      <section className="bg-primary">
        <div className="container flex flex-col md:flex-row justify-between items-center mx-auto">
          <div className="flex flex-col gap-6 text-white p-10 ">
            <h2 className="flex gap-2 text-[50px] items-center font-[300]">
              Our Vision <BsArrowUpCircleFill size={95} />
            </h2>
            <p className="max-w-[659px] w-full">
              ATSUR provides a seamless and efficient platform for tracking and
              managing art assets on the blockchain, ensuring secure sale,
              resale, royalties, and future tracking. With our custom protocols,
              we upscale the valuation of art and standardize records across the
              Afrocentric art ecosystem.
            </p>
          </div>
          <Image
            src={"/images/homepage/vision.png"}
            alt=""
            width={591}
            height={583}
          />
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="page-container  flex flex-col items-center">
          <h2 className="text-center text-[50px] justify-center flex items-center gap-4">
            Our Services <BsArrowUpLeftCircleFill size={90} />
          </h2>
          <div className="grid gap-4  justify-center mt-8 items-stretch md:grid-cols-2">
            {services?.map((service, index) => (
              <div
                className={`w-fit max-w-[350px] w-full md:flex-row flex-col flex justify-between gap-10 items-center p-5 ${
                  service.color === "#000"
                    ? "bg-primary text-white"
                    : "border-primary border-[1px] text-primary"
                }`}
                key={`our-services-${index}`}
              >
                <div className="flex flex-col items-start justify-between h-full">
                  <h3 className="text-xl">{service.title}</h3>
                  <Button
                    variant="text"
                    className={` font-[300]  ${
                      service.color === "#000" ? "text-white" : "text-primary"
                    }`}
                    startIcon={<BsArrowUpRightCircleFill size={28} />}
                  >
                    Learn more
                  </Button>
                </div>

                <Image
                  className="relative"
                  src={service.image}
                  alt={service?.title}
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-10">
        <div className="page-container flex flex-col items-center">
          <div className="flex flex-wrap item-center gap-8">
            <h3 className="text-[50px] font-semibold">Testimonials</h3>
            <p className="text-[20px] font-[300] max-w-[394px] w-full">
              “ATSUR has revolutionized the art industry in Africa. Their
              platform provides a secure and transparent way to buy, sell, and
              track art assets. It&apos;s a game-changer!”
            </p>

            <Image
              height={178}
              width={136}
              src={"/images/homepage/testimonial-image.png"}
              alt=""
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="page-container flex flex-col md:px-10 ">
          <h2 className=" text-[50px] flex items-center gap-4">
            Our Team <BsArrowUpLeftCircleFill size={90} />
          </h2>
          <div
            style={{
              background: ` url(/images/top-collection.png)`,
              backgroundSize: "cover",
            }}
            className="p-10 bg-primary justify-center mt-8 flex gap-4 flex-col md:flex-row   items-center"
          >
            {team?.map((item) => (
              <div
                key={`---${item.name}`}
                className="max-w-[348px] w-full bg-white"
              >
                <Image src={item.image} alt="" height={254} width={348} />
                <div className="flex flex-col items-center py-5   mt-4">
                  <h4 className="text-[24px] font-[500]">{item.name}</h4>
                  <p className="text-xs">{item.designation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PricingLayout>
  );
};

export default Homepage;
