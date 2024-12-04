import React from "react";
import { VoiceTrackIcon } from "../common/AppIcons";

const UserVideoCall = () => {
  return (
    <>
      <video
        autoPlay
        muted
        loop
        className="w-full h-screen sm:h-[calc(100vh-315px)] object-cover sm:rounded-b-2xl lg:rounded-2xl mx-auto"
      >
        <source src="/videos/5998385-hd_1920_1080_30fps.mp4" type="video/mp4" />
      </video>
      <div className="w-full absolute top-5 sm:top-10 flex items-center justify-between right-0 px-4 sm:px-6 xl:px-12">
        <span className="bg-black backdrop-blur-[8px] bg-opacity-30 rounded-full px-[29px] py-2 font-poppins font-medium text-sm sm:text-lg text-white">
          Dr. Anita Joseph
        </span>
        <span className="w-10 h-10 sm:w-[60px] sm:h-[60px] bg-black backdrop-blur-[8px] bg-opacity-30 rounded-full grid place-content-center font-medium text-lg">
          <VoiceTrackIcon />
        </span>
      </div>
    </>
  );
};

export default UserVideoCall;
