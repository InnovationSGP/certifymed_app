import React from "react";
import Image from "next/image";

const TestimonialCard = ({ testimonial }) => {
  return (
    <>
      <div className="py-10 px-5 xl:px-[30px] max-w-[360px] mx-auto flex justify-center items-center flex-col relative">
        <p className="paragraph !text-secondary mb-4 text-center">
          {`“${testimonial.quote}”`}
        </p>
        <div className="flex justify-center items-center gap-[5px] flex-col">
          <Image
            src={testimonial.image}
            width={50}
            height={50}
            alt={testimonial.name}
          />
          <h5 className="paragraph h-6 !text-secondary !font-semibold">
            {testimonial.name}
          </h5>
          <h6 className="paragraph !text-sm">{testimonial.role}</h6>
        </div>
      </div>
    </>
  );
};

export default TestimonialCard;
