import React, { ReactElement } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

const Carousel: ReactElement = ({ books }) => {
  return (
    <div className="carousel">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={6}
        navigation
        pagination
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {books.map((book) => (
          <div key={book.id}>
            {book.featured && (
              <SwiperSlide>
                <img
                  className="carousel-image"
                  src={book.image_url}
                  alt="carousel_image"
                />
              </SwiperSlide>
            )}
          </div>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
