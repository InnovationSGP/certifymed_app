import {
  Facebook,
  GoogleIcon,
  Pinterest,
  Twitch,
  Youtube,
} from "../common/Icons";

const OurPartners = () => {
  return (
    <>
      <section className="w-full bg-paleGrey py-16 md:py-20 lg:py-[112px]">
        <h2 className="section-heading text-center mb-10 px-5">Our Partners</h2>
        <div className="max-w-[1136px] px-5 xl:px-0 mx-auto">
          <div className="sm:flex grid grid-cols-2 place-items-center gap-8 items-center justify-between flex-wrap gap-y-12">
            <GoogleIcon />
            <Facebook />
            <Youtube />
            <Pinterest />
            <Twitch />
          </div>
        </div>
      </section>
    </>
  );
};

export default OurPartners;
