'use client';
import { useState } from "react";
import { MuteIcon, UnMuteIcon } from "../common/AppIcons";

const MeVideoCall = () => {
  const [isMuted, setMuted] = useState(false);
  return (
    <>
      <div className="absolute bottom-[200px] sm:bottom-12 right-4 sm:right-[52px]">
        <div className="relative ">
          <video
            autoPlay
            muted
            loop
            className="sm:w-[296px] sm:h-[181] w-[105px] h-[170px] object-cover rounded-2xl"
          >
            <source
              src="/videos/5998385-hd_1920_1080_30fps.mp4"
              type="video/mp4"
            />
          </video>

          <div className="w-full absolute bottom-0 sm:flex items-center justify-between p-3 hidden">
            <span className="bg-black backdrop-blur-[8px] bg-opacity-30 rounded-full px-[19px] py-1.5 font-inter font-medium  text-white">
              Kunle Johnson
            </span>
            <button
              onClick={() => setMuted(!isMuted)}
              className="w-10 h-10 bg-lightred backdrop-blur-[8px] rounded-full grid place-content-center font-medium text-lg"
            >
              {isMuted ? <MuteIcon /> : <UnMuteIcon />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeVideoCall;
