"use client";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { LeftArrow, RightArrow } from "../common/Icons";
import { testimonials } from "../common/Helper";
import TestimonialCard from "./TestimonialCard";

const TestimonialSlider = () => {
  return (
    <div className="max-w-[1440px] mx-auto relative mt-10 md:mt-11">
      <div className="relative flex justify-center  items-center md:items-end xl:pl-14">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            500: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3.4,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 3.6,
              spaceBetween: 24,
            },
          }}
        >
          {testimonials?.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex md:hidden justify-center !mt-5 items-center relative">
        <button
          className="swiper-button-prev mx-10  !relative z-10
             !h-[46px] !w-[46px] p-4 flex justify-center items-center  rounded-xl bg-primary cursor-pointer"
        >
          <LeftArrow />
        </button>
        <button className="swiper-button-next !h-[46px] mr-7 !relative !w-[46px] p-4 flex justify-center items-center rounded-xl bg-primary cursor-pointer">
          <RightArrow />
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
