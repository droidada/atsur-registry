import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "@/components/common/image";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  loop: false,
  slidesPerView: 2,
  observer: true,
  grabCursor: true,
  observeParents: true,
  spaceBetween: 30,
  autoplay: {
    delay: 2700,
    disableOnInteraction: false,
  },
  navigation: {
    clickable: true,
    nextEl: ".seller-next",
    prevEl: ".seller-prev",
  },
  breakpoints: {
    500: {
      slidesPerView: 3,
    },
    640: {
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 5,
    },
    1070: {
      slidesPerView: 6,
    },
  },
};

import Link from "next/link";
import { Avatar } from "@mui/material";
export default function Seller7({ artists }) {
  console.log(artists[0]?.avatar);
  return (
    <>
      <div className="tf-section seller ">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="heading-section">
                <h2 className="tf-title pb-30">
                  Our top artists
                  {/* <span className="dropdown" id="select-day">
                    <span className="btn-selector tf-color">
                      <span>1 day</span>
                    </span>
                    <ul>
                      <li>
                        <span>1 day</span>
                      </li>
                      <li>
                        <span>3 day</span>
                      </li>
                      <li>
                        <span>7 day</span>
                      </li>
                    </ul>
                  </span> */}
                </h2>
              </div>
            </div>
            <div className="col-md-12">
              <Swiper
                {...swiperOptions}
                className="swiper-container seller seller-slider2"
              >
                <div className="swiper-wrapper">
                  {artists?.map((artist, index) => (
                    <SwiperSlide key={artist._id}>
                      <div className="tf-author-box text-center flex flex-col items-center ">
                        <div className="author-avatar ">
                          <Avatar
                            className="w-32 h-32"
                            src={artist?.avatar}
                            label={artist?.firstName}
                          />
                          <div className="number">{index + 1}</div>
                        </div>
                        <div className="author-infor ">
                          <h5>
                            <Link href="/artist">
                              {artist?.firstName} {artist?.lastName}
                            </Link>
                          </h5>
                          <h6 className="price gem style-1">
                            <i className="icon-gem" />
                            7,080.95
                          </h6>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>
              <div className="swiper-button-next seller-next over active" />
              <div className="swiper-button-prev seller-prev over " />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
