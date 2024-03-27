import Link from "next/link";
import Image from "@/components/common/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  loop: false,
  slidesPerView: 1,
  observer: true,
  observeParents: true,
  spaceBetween: 30,
  navigation: {
    clickable: true,
    nextEl: ".slider-next",
    prevEl: ".slider-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1300: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
};

// import Countdown from "@/open9/elements/Countdown";
import { useEffect, useState } from "react";
import BidModal from "../elements/BidModal";
import ArtPieceCard from "@/components/common/ArtPieceCard";
const currentTime = new Date();
export default function FeaturedSlider1({ relatedArtPieces, currentId }) {
  const [isBidModal, setBidModal] = useState(false);
  const handleBidModal = () => setBidModal(!isBidModal);
  const [related, setRelated] = useState(
    relatedArtPieces?.filter((item) => item._id !== currentId),
  );

  useEffect(() => {
    setRelated(relatedArtPieces?.filter((item) => item._id !== currentId));
  }, [currentId]);

  console.log(relatedArtPieces);
  console.log(currentId);
  console.log(relatedArtPieces?.filter((item) => item._id !== currentId));

  return (
    <>
      {/* <Swiper {...swiperOptions} className="abc">
                <SwiperSlide>Slide 1</SwiperSlide>
            </Swiper> */}

      <div className="featured pt-10 swiper-container carousel">
        <Swiper {...swiperOptions}>
          {related.map((artPiece) => (
            <SwiperSlide key={artPiece._id}>
              <ArtPieceCard
                image={artPiece?.assets[0]?.url}
                title={artPiece?.title}
                link={`/explore/art-piece/${artPiece?._id}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-pagination" />
        <div className="slider-next swiper-button-next" />
        <div className="slider-prev swiper-button-prev" />
      </div>
      <BidModal handleBidModal={handleBidModal} isBidModal={isBidModal} />
    </>
  );
}
