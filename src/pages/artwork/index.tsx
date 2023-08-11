import CuratorsPick from "@/components/curatorsPick";
import Layout from "@/components/layout";
import React, { useState } from "react";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import {
  CarouselProvider,
  Slider,
  Slide,
  DotGroup,
  Dot,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import Image from "next/image";
import image from "../assets/image.jpeg";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";

const Artwork = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleDotClick = (index) => {
    setActiveSlide(index);
  };
  const handleSlideChange = (newSlide) => {
    setActiveSlide(newSlide);
    handleDotClick(newSlide); // Call handleDotClick when slide changes
  };

  const totalSlides = 3;
  return (
    <Layout>
      <div className="p-10 flex flex-col gap-6">
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="w-full px-[50px] py-0">
            <CarouselProvider
              naturalSlideWidth={90}
              naturalSlideHeight={90}
              totalSlides={totalSlides}
              interval={3000}
              isPlaying={true}
              currentSlide={activeSlide}
              playDirection="forward"
            //   onChange={handleSlideChange}
            >
              <Slider className="w-full">
                <Slide index={0}>
                  <Image alt="" className="w-full h-[90%]" src={image1} />
                </Slide>
                <Slide index={1}>
                  <Image alt="" className="w-full h-[90%]" src={image2} />
                </Slide>
                <Slide index={2}>
                  <Image alt="" className="w-full h-[90%]" src={image3} />
                </Slide>
              </Slider>
              <DotGroup className="custom-dots-container flex justify-center gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-20 m-2 h-[2px] ${
                      activeSlide === index ? "bg-black" : "bg-gray-300"
                    }`}
                    onClick={() => handleDotClick(index)}
                  ></div>
                ))}
              </DotGroup>
            </CarouselProvider>
          </div>
          <div>
            <h3 className="text-[24px] font-normal">Minne Atairu</h3>
            <h3 className="text-[24px] font-normal">Blonde Braids Study II</h3>
            <p className="text-[16px] font-normal mt-5">Oil on canvas</p>
            <p className="text-[16px] font-normal">
              11 4/5 × 15 7/10 × 1 3/5 in | 30 × 40 × 4 cm
            </p>
            <p className="text-[16px] font-normal">Frame included</p>
            <div className="flex items-center gap-3 mt-5 mb-2">
              <WorkOutlineIcon />
              <p className="underline">Unique work</p>
            </div>
            <div className="flex items-center gap-3">
              <CardMembershipIcon />
              <p>Includes a</p>
              <p className="underline">Certificate of authenticity</p>
            </div>
            <p className="text-[16px] font-normal mt-5">
              “In ‘Blonde Braids Study II,’ I examine the ways in which a
              text-to-image algorithm — Midjourney (v4) — renders a portrait of
              Black identical twins adorned with blonde braids. The resulting
              image underscores significant gaps in the training data, which
              inevitably precipitates a flattened representation of the Black
              identity outlined in the text prompt. Instead, the algorithm
              generates an interpretation that evokes the semblance of fraternal
              twins, their hair styled in blonde, permed waves.” — Minne Atairu
            </p>
            <p className="text-[16px] font-normal mt-5">Bartha Contemporary</p>
            <p className="text-[12px] font-normal">London</p>
            <div className="flex flex-wrap gap-8 mt-10">
              <button className="border border-solid border-black px-12 py-5">
                Request Info
              </button>
              <button className="border border-solid border-black px-12 py-5">
                Contact Gallery
              </button>
            </div>
          </div>
        </div>
        <CuratorsPick title={"Other works from Minne Atairu"} length={4} />
        <CuratorsPick
          title={"Other works from Bartha Contemporary"}
          length={4}
        />
      </div>
    </Layout>
  );
};

export default Artwork;
