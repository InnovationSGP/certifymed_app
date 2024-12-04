import { TransitionLink } from "@/utlis/TransitionLink";

const StartYourHealthJourney = () => {
  return (
    <>
      <section
        id="contact"
        className="custom-container mt-[70px] lg:mt-[105px] mb-[135px]"
      >
        <div className="bg-spaceCadet sm:bg-[url('/images/CTA.webp')]  bg-[url('/images/CTA-mobile.webp')] bg-bottom sm:bg-right-bottom bg-no-repeat bg-[100%,100%] sm:bg-cover rounded-[30px] sm:rounded-[56px] py-[89px] md:py-[110px] px-[23px]">
          <div className="w-full max-w-[625px] mx-auto text-center relative">
            <h3 className=" !text-white section-heading mb-6 sm:mb-2.5">
              Start your health journey
            </h3>
            <p className="text-superSilver font-poppins leading-[30px] mb-14 sm:mb-[35px]">
              Join CertifyMed now, say goodbye to long waiting times and hello
              to seamless healthcare solutions tailored to your needs.
            </p>
            <TransitionLink
              href="/sign-up"
              className="transition-all duration-300 ease-in-out text-mainblack font-medium bg-white px-[62px] py-3.5 rounded-xl hover:bg-[#324360] hover:text-white"
            >
              Get started
            </TransitionLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default StartYourHealthJourney;
