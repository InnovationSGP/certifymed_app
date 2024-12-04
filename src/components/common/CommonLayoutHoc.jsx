import Image from "next/image";
import React from "react";

const CommonLayoutHoc = ({ children, className }) => {
  return (
    <section className="bg-black">
      <main className="h-screen flex bg-white overflow-hidden">
        <div className="lg:w-[42%] lg:block hidden flex-shrink-0 relative">
          <div className="absolute w-full h-full bg-primary opacity-70"></div>
          <Image
            src="/images/common.webp"
            width={599}
            height={1000}
            className="w-full h-screen object-cover"
            alt="Background Image"
          />
        </div>
        <div
          className={`h-full w-full flex-col px-5 lg:w-[58%] flex items-center  overflow-auto hide-scrollbar ${className}`}
        >
          {children}
        </div>
      </main>
    </section>
  );
};

export default CommonLayoutHoc;
