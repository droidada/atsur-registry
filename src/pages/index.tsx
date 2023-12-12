import Image from "next/image";
import Layout from "@/components/layout/layout";
import FeaturedSection from "@/components/featuredSection";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import image from "../../assets/image.jpeg";
import { useEffect, useState } from "react";
import useAxiosAuth from "@/hooks/useAxiosAuth";

function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  const [entries, setEntries] = useState<[]>();
  const axiosAuth = useAxiosAuth();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://admin.atsur.art/items/entry?fields=*,assets.*, asset_files.*",
      );
      const data = await res.json();
      setEntries(data ? data.data : []);
      console.log("we have data here");
    };
    fetchData();
  }, []);

  const handleDotClick = (index) => {
    setActiveSlide(index);
  };
  const handleSlideChange = (newSlide) => {
    setActiveSlide(newSlide);
    handleDotClick(newSlide); // Call handleDotClick when slide changes
  };

  const totalSlides = 1;

  return (
    <div>
      <main>
        <Layout>
          <div>
            <div className="h-700 px-10">
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
                  {/* <Slide index={1}>
                    <Image alt="" className="w-full h-[90%]" src={image1} />
                  </Slide>
                  <Slide onFocus={() => handleSlideChange} index={2}>
                    <Image alt="" className="w-full h-[90%]" src={image2} />
                  </Slide>
                  <Slide index={3}>
                    <Image alt="" className="w-full h-[90%]" src={image3} />
                  </Slide> */}
                </Slider>
                {/* <DotGroup className="custom-dots-container flex justify-center items-center">
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
                </DotGroup> */}
              </CarouselProvider>
            </div>
            <div className="px-10 mt-10">
              <FeaturedSection data={entries} />
            </div>
            {/* <div className="px-10">
              <CuratorsPick title={"Curator's Pick"} length={6} />
            </div> */}
            {/* <div className="bg-black py-[61px] flex justify-center">
              <p className="text-[#FFB800] text-center text-[32px]">
                Register Artwork Ad
              </p>
            </div> */}
            {/* <div className="px-10 mt-20">
              <Editorial />
            </div>
            <div className="px-10 mt-20">
              <TrendingArtists />
            </div>
            <div className="px-10 mt-20 mb-2">
              <FeaturedInstitution />
            </div> */}
            {/* <div className="bg-black py-[61px] flex justify-center mx-[35px] my-[50px]">
              <p className="text-[#FFB800] text-center text-[32px]">
                Join our Creative Community
              </p>
            </div> */}
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
    </div>
  );
}

export default Home;
