import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import Image from "next/image";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { getImage } from "@/lib/supabase";

/* --------------------------------- Styles --------------------------------- */
/* ------------------------------- Interfaces ------------------------------- */

interface Props {
  images: string[];
}

export const ImageSlide: React.FC<Props> = ({ images }) => {
  /* ---------------------------------- Hooks --------------------------------- */

  /* --------------------------------- States --------------------------------- */

  /* --------------------------------- Queries -------------------------------- */

  /* -------------------------------- Mutations ------------------------------- */

  /* --------------------------------- Logics --------------------------------- */
  const renderImage = (paths: string[]) => {
    return paths.map((path, idx) => (
      <SwiperSlide>
        <img src={getImage("reviews/" + path)} alt="place-image" width={300} />
      </SwiperSlide>
    ));
  };
  /* --------------------------------- Effects -------------------------------- */

  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination]}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
        }}
        spaceBetween={10}
        navigation={{ enabled: true }}
        pagination={{ clickable: true }}
      >
        {renderImage(images)}
      </Swiper>
    </div>
  );
};
