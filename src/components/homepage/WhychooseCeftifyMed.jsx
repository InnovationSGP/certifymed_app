import React from "react";
import { Convenience, InstantAccess, SecureIcon } from "../common/AppIcons";

const WhychooseCeftifyMed = () => {
  return (
    <>
      <section
        id="how-it-works"
        className="custom-container py-[70px] lg:py-[105px]"
      >
        <h2 className="text-mainblack text-center  section-heading">
          Why choose CetifyMed?
        </h2>
        <div className="flex justify-center flex-wrap lg:flex-nowrap gap-8 sm:gap-5 xl:gap-9 mt-6 lg:mt-10">
          <article className="why-card sm:w-[48%] lg:w-full ">
            <span className="bg-primary rounded-full p-3.5 w-[70px] h-[70px] bg-opacity-10 mb-6 grid place-content-center">
              <InstantAccess />
            </span>
            <h4 className="text-[21px] font-semibold mb-3">Instant Access</h4>
            <div className="w-full max-w-[320px]">
              <p className="paragraph">
                Connect with a healthcare professional within minutes, 24/7,
                whenever you need it.
              </p>
            </div>
          </article>
          {/* Instant Access */}
          <article className="why-card sm:w-[48%] lg:w-full ">
            <span className="bg-primary rounded-full p-3.5 w-[70px] h-[70px] bg-opacity-10 mb-6 grid place-content-center">
              <Convenience />
            </span>
            <h4 className="text-[21px] font-semibold mb-3">Convenience</h4>
            <div className="w-full max-w-[320px]">
              <p className="paragraph">
                Skip the waiting room and have your appointments from the
                comfort of your home or on-the-go.
              </p>
            </div>
          </article>
          {/* Convenience */}
          <article className="why-card sm:w-[48%] lg:w-full ">
            <span className="bg-primary rounded-full p-3.5 w-[70px] h-[70px] bg-opacity-10 mb-6 grid place-content-center">
              <SecureIcon />
            </span>
            <h4 className="text-[21px] font-semibold mb-3">
              Secure & Confidential
            </h4>
            <div className="w-full max-w-[295px]">
              <p className="paragraph">
                Your privacy is our top priority. Be rest assured, your
                information is safe with us.
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default WhychooseCeftifyMed;
