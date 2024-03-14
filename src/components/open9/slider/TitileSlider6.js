import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "@/components/common/image";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  direction: "vertical",
  spaceBetween: 45,
  grabCursor: false,
  speed: 10000,
  centeredSlides: false,
  loop: true,
  slidesPerView: "auto",
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
};

export default function TitileSlider6() {
  return (
    <>
      <Swiper
        {...swiperOptions}
        className="swiper-container autoslider1reverse swiper-container-initialized swiper-container-vertical swiper-container-pointer-events"
      >
        <SwiperSlide>
          <Image
            src="/assets/images/item-background/bg-home7-item1.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/assets/images/item-background/bg-home7-item2.png"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
