"use client";
import Image from "next/image";
import React from "react";
import PrimaryBtn from "../common/PrimaryBtn";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Hero = () => {
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigationHandler = () => {
    router.push("/dashboard/doctor");
  };

  return (
    <section className="pt-[51px] md:pt-14 pb-[70px] md:pb-28 custom-container flex justify-between w-full gap-16 md:gap-6 md:flex-row flex-col overflow-hidden">
      <div
        data-aos-delay="500"
        data-aos="fade-right"
        className="md:max-w-[505px] w-full lg:mt-14"
      >
        <h1 className="main-heading mb-3">
          Your gateway to healthcare anytime anywhere
        </h1>
        <p className="paragraph  mb-9">
          Discover the future of healthcare through CertifyMed: top-tier medical
          care at your fingertips. No more waiting—access qualified
          professionals instantly from home.
        </p>
        <PrimaryBtn onClick={navigationHandler} className="w-fit">
          Get started
        </PrimaryBtn>
      </div>
      <div
        data-aos-delay="500"
        data-aos="fade-left"
        className="md:max-w-[586px] w-full"
      >
        <Image
          className=""
          src="/images/hero.webp"
          width={586}
          height={550}
          alt="hero"
        />
      </div>
    </section>
  );
};

export default Hero;
