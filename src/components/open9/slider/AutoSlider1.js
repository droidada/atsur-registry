import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "@/components/common/image";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 14,
  direction: "vertical",
  speed: 10000,
  observer: true,
  observeParents: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
};

export default function AutoSlider1({ images }) {
  console.log("images", images);
  return (
    <>
      {/* <Swiper {...swiperOptions} className="abc">
                <SwiperSlide>Slide 1</SwiperSlide>
            </Swiper> */}

      <Swiper
        {...swiperOptions}
        className="swiper-container autoslider3reverse swiper-container-vertical "
      >
        <SwiperSlide>
          <Image
            src="/assets/images/item-background/bg-action-1.png"
            width={150}
            height={200}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/assets/images/item-background/bg-action-1.png"
            width={150}
            height={200}
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
