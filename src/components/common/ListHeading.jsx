import { TransitionLink } from "@/utlis/TransitionLink";
const ListHeading = ({ heading, href = "#" }) => {
  return (
    <>
      <div className="flex justify-between items-center sm:bg-white sm:pl-[21px] sm:pr-[29px] py-5 rounded-t-xl">
        {heading && <h2 className="text-lg font-semibold">{heading}</h2>}
        <TransitionLink
          href={href}
          className="font-semibold font-poppins text-primary"
        >
          See all
        </TransitionLink>
      </div>
    </>
  );
};

export default ListHeading;
