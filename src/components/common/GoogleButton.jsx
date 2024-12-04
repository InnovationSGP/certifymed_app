// components/GoogleButton.js

import { Google } from "./AppIcons";

const GoogleButton = ({ text = "Sign up with Google", onClick }) => {
  return (
    <>
      <button
        className="w-full bg-superSilver hover:bg-[#E0E0E0]  duration-300 ease-in-out transition-colors paragraph h-[55px] xl:h-[60px] rounded-xl py-[18px] flex items-center justify-center gap-x-2.5 font-medium mb-[9px]"
        onClick={onClick}
      >
        <Google />
        <span>{text}</span>
      </button>

      <div className="flex items-center gap-x-3 mb-[11px] sm:mb-[30px]">
        <div className="border border-superSilver w-full"></div>
        <span>or</span>
        <div className="border border-superSilver w-full"></div>
      </div>
    </>
  );
};

export default GoogleButton;
