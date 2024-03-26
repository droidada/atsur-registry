import { useEffect, useState } from "react";
import Link from "next/link";

import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "@/lib/axios";
import Image from "next/image";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation, FreeMode],
  loop: true,
  spaceBetween: 53,
  slidesPerView: 1,
  centeredSlides: true,
  freeMode: true,
  watchSlidesProgress: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  observer: true,
  observeParents: true,
  breakpoints: {
    500: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
};

export default function TitileSlider5() {
  const [pieces, setPieces] = useState([]);
  useEffect(() => {
    try {
      const fetchPieces = async () => {
        const res = await axios.get("/art-piece/home");
        setPieces(res.data.artPieces);
      };
      fetchPieces();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <Swiper {...swiperOptions} className="swiper-container swiper-rotate-3">
        {pieces?.map((artPiece, idx) => (
          <SwiperSlide key={idx}>
            <div className="tf-card-box style-2 type-1 shadow-md  overflow-hidden">
              <div className="card-media relative h-[350px] bg-[#fafafa] rounded-xl overflow-hidden  ">
                {/* <Link href="#"> */}
                <Image
                  fill
                  src={artPiece.assets[0]?.url}
                  className="object-cover w-full h-full"
                  alt=""
                />
                {/* </Link> */}
              </div>
              <div className="button-place-bid">
                <Link
                  href={`/explore/art-piece/${artPiece._id}`}
                  className="tf-button"
                >
                  <span>View</span>
                </Link>
              </div>
              <div className="featured-countdown">
                <span
                  className="js-countdown"
                  data-timer={7500}
                  data-labels="d,h,m,s"
                >
                  <div aria-hidden="true" className="countdown__timer">
                    <span
                      className="countdown__item"
                      style={{ display: "none" }}
                    >
                      <span className="countdown__value countdown__value--0 js-countdown__value--0">
                        0
                      </span>
                      <span className="countdown__label">d</span>
                    </span>
                    <span className="countdown__item">
                      <span className="countdown__value countdown__value--1 js-countdown__value--1">
                        02
                      </span>
                      <span className="countdown__label">h</span>
                    </span>
                    <span className="countdown__item">
                      <span className="countdown__value countdown__value--2 js-countdown__value--2">
                        04
                      </span>
                      <span className="countdown__label">m</span>
                    </span>
                    <span className="countdown__item">
                      <span className="countdown__value countdown__value--3 js-countdown__value--3">
                        28
                      </span>
                      <span className="countdown__label">s</span>
                    </span>
                  </div>
                </span>
              </div>
              <span className="wishlist-button icon-heart" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
