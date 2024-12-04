import React from "react";
import { LeftArrow, RightArrow } from "../common/Icons";
import TestimonialSlider from "./TestimonialSlider";

const Testimonials = () => {
  return (
    <section className="py-[70px] lg:py-[105px] overflow-hidden">
      <div className=" custom-container flex justify-between items-center relative ">
        <div className="max-w-[527px]">
          <h2 className="section-heading  mb-2.5">Testimonials</h2>
          <p className="paragraph">
            Don&apos;t just take our word for it. See what our customers have to
            say about their experience.
          </p>
        </div>
        <div className="md:flex hidden items-center gap-6 relative">
          <button
            className="swiper-button-prev absolute -mx-28 lg:-mx-32 z-10
             lg:!h-[52px] !w-11 !h-11 lg:!w-[52px] p-3 lg:p-4 flex justify-center items-center rounded-xl bg-primary cursor-pointer"
            aria-label="Previous slide"
          >
            <LeftArrow />
          </button>
          <button
            className="swiper-button-next !mx-0 lg:!h-[52px] !w-11 !h-11 lg:!w-[52px] !right-0 p-3 lg:p-4 flex justify-center items-center rounded-xl bg-primary cursor-pointer"
            aria-label="Next slide"
          >
            <RightArrow />
          </button>
        </div>
      </div>
      <TestimonialSlider />
    </section>
  );
};

export default Testimonials;
