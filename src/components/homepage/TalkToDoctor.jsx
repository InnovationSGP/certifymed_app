import React from "react";
import PrimaryBtn from "../common/PrimaryBtn";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransitionRouteChange } from "@/utils/useTransitionRouteChange";

const TalkToDoctor = () => {
  const router = useRouter();
  const { handleTransition } = useTransitionRouteChange();

  return (
    <section
      id="about"
      className="bg-[url('/images/chat-with-doctor-bg.png')] md:bg-[url('/images/chat-with-doctor-bg.webp')] bg-cover"
    >
      <div className="flex justify-between items-center px-5 xl:px-0 max-w-[1077px] mx-auto md:flex-row flex-col gap-20 pt-16 md:pt-0 overflow-hidden">
        <div className="md:max-w-[490px] w-full lg:mt-14">
          <h2 className="section-heading mb-3">
            Call or chat verified doctors
          </h2>
          <p className="paragraph  mb-9">
            With CertifyMed, you can access licensed doctors online via chat,
            audio calls, or video conferencing for immediate feedback and
            prescriptions directly on your mobile device while on the move.
          </p>
          <PrimaryBtn
            // onClick={() => router.push("/dashboard/doctor")}
            onClick={() => handleTransition("/sign-up")}
            className="!w-fit"
          >
            Talk to a Doctor
          </PrimaryBtn>
        </div>
        <div className="md:max-w-[419px] w-full  -ml-12 sm:ml-auto lg:pt-12">
          <Image
            src="/images/doc-mockup.png"
            width={419}
            height={550}
            alt="hero"
          />
        </div>
      </div>
    </section>
  );
};

export default TalkToDoctor;
