import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "@/components/web3/Account";
import ETHBalance from "@/components/web3/ETHBalance";
import TokenBalance from "@/components/web3/TokenBalance";
import useEagerConnect from "@/hooks/useEagerConnect";
import Paystack from "@/components/Paystack";
import CloverIIIF from "@/components/CloverIIIF";
import SignIn from "@/components/SignIn";

import Image from "next/image";
import { Inter } from "@next/font/google";
import Layout from "@/components/layout";
import FeaturedSection from "@/components/featuredSection";
import CuratorsPick from "@/components/curatorsPick";
import Editorial from "@/components/editorial";
import FeaturedInstitution from "@/components/featuredInstitute";
import TrendingArtists from "@/components/trendinArtist";
import {
  CarouselProvider,
  Slider,
  Slide,
  DotGroup,
  Dot,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import image from "../../assets/image.jpeg";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";

const inter = Inter({ subsets: ["latin"] });
const DAI_TOKEN_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";

function Home({ data }) {
  const { account, library } = useWeb3React();
  const triedToEagerConnect = useEagerConnect();
  const isConnected = typeof account === "string" && !!library;

  const [activeSlide, setActiveSlide] = useState(0);

  const handleDotClick = (index) => {
    setActiveSlide(index);
  };
  const handleSlideChange = (newSlide) => {
    setActiveSlide(newSlide);
    handleDotClick(newSlide); // Call handleDotClick when slide changes
  };

  const totalSlides = 4;

  return (
    <div>
      <Head>
        <title>Atsur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <header>
        <nav>
          <Link href="/">next-web3-boilerplate</Link>

          <Account triedToEagerConnect={triedToEagerConnect} />
        </nav>
      </header> */}

      <main>
        <Layout>
          <div className="px-10">
            <div className="h-[700px]">
              <CarouselProvider
                naturalSlideWidth={90}
                naturalSlideHeight={35}
                totalSlides={totalSlides}
                interval={3000}
                isPlaying={true}
                currentSlide={activeSlide}
                playDirection="forward"
                // onChange={() => handleSlideChange}
              >
                <Slider className="w-full">
                  <Slide index={0}>
                    <Image alt="" className="w-full h-[90%]" src={image} />
                  </Slide>
                  <Slide index={1}>
                    <Image alt="" className="w-full h-[90%]" src={image1} />
                  </Slide>
                  <Slide onFocus={() => handleSlideChange} index={2}>
                    <Image alt="" className="w-full h-[90%]" src={image2} />
                  </Slide>
                  <Slide index={3}>
                    <Image alt="" className="w-full h-[90%]" src={image3} />
                  </Slide>
                </Slider>
                <DotGroup className="custom-dots-container flex justify-center items-center">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <div
                      key={index}
                      className={`flex-1 h-[3px] ${
                        activeSlide === index ? "bg-black" : "bg-gray-300"
                      }`}
                      onClick={() => handleDotClick(index)}
                    ></div>
                  ))}
                  <div className="flex gap-2 ml-6">
                    <ButtonBack>
                      <ArrowBackIosIcon />
                    </ButtonBack>
                    <ButtonNext>
                      <ArrowForwardIosIcon />
                    </ButtonNext>
                  </div>
                </DotGroup>
              </CarouselProvider>
            </div>
            <FeaturedSection data={data} />
            <CuratorsPick title={"Curator's Pick"} length={6} />
            <div className="bg-black py-[61px] flex justify-center">
              <p className="text-[#FFB800] text-center text-[32px]">
                Register Artwork Ad
              </p>
            </div>
            <Editorial />
            <TrendingArtists />
            <FeaturedInstitution />
            <div className="bg-black py-[61px] flex justify-center mx-[35px] my-[50px]">
              <p className="text-[#FFB800] text-center text-[32px]">
                Join our Creative Community
              </p>
            </div>
          </div>
        </Layout>

        {/* {isConnected && (
          <section>
            <ETHBalance />
            <TokenBalance tokenAddress={DAI_TOKEN_ADDRESS} symbol="DAI" />
          </section>
        )}
        <h2>Sign In</h2>
        <SignIn />
        <h2>Pay with Paystack</h2>
        <Paystack />
        <h2> Clover Stuff </h2>
        <CloverIIIF
          id={"https://digital.lib.utk.edu/assemble/manifest/heilman/1187"}
        />
        ; */}
      </main>

      {/* <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
        }

        main {
          text-align: center;
        }
      `}</style> */}
    </div>
  );
}
export const getServerSideProps = async () => {
  const entry = await directus.request(readItems("entry"));

  const promise = entry.map(async (entry) => {
    return directus.request(
      readItems("assets_files", {
        filter: {
          assets_id: {
            _eq: entry?.primary_image?.key,
          },
        },
      }),
    );
  });
  const assets = await Promise.all(promise);

  return {
    props: {
      data: {
        assets,
        entry,
      },
    },
  };
};
export default Home;
