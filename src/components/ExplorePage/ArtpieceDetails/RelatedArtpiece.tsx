import RelatedArtpieceCard from "@/components/RelatedArtpieceCard";
import { IRelatedArtPiece } from "@/types/models/exploreArtpieceDetails";
import { Stack } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";

interface Props {
  relatedArtpieces: IRelatedArtPiece[];
}

const swiperOptions = {
  modules: [Pagination, Navigation],
  loop: false,
  slidesPerView: 1,
  spaceBetween: 10,
  observer: true,
  observeParents: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  navigation: {
    clickable: true,
    nextEl: ".next-type1",
    prevEl: ".prev-type1",
  },
  pagination: {
    el: ".pagination-type1",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  },
};
const RelatedArtpiece: React.FC<Props> = ({ relatedArtpieces }) => {
  console.log(relatedArtpieces[0]?.custodian);
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent={"space-between"}
      alignItems={"start"}
      spacing={4}
    >
      <h2 className="text-xl lg:text-[25px] lg:leading-[16px] font-[600]">
        Related Pieces
      </h2>
      <div className="w-full lg:w-2/3">
        <Swiper className="items-stretch  " {...swiperOptions}>
          {relatedArtpieces?.slice(0, 4)?.map((artpiece) => (
            <SwiperSlide className="h-[auto]" key={artpiece._id}>
              <RelatedArtpieceCard
                key={artpiece._id}
                className="flex-shrink-0"
                link={`/explore/art-piece/${artpiece._id}`}
                image={artpiece?.assets[0]?.url}
                title={artpiece.title}
                rating={artpiece.rating}
                creator={{
                  name: `${artpiece?.custodian?.profile?.firstName} ${artpiece?.custodian?.profile?.lastName}`,
                  avatar: artpiece?.custodian?.profile?.avatar,
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Stack>
  );
};

export default RelatedArtpiece;
