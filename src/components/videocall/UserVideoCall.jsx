import React, { useEffect, useRef } from "react";
import { VoiceTrackIcon } from "../common/AppIcons";

const UserVideoCall = ({ userVideo, userName }) => {
  console.log("UserVideoCall rendered");
  const videoContainerRef = useRef(null);

  useEffect(() => {
    // If userVideo is provided, add it to the container
    if (userVideo && videoContainerRef.current) {
      // Clear any existing content
      videoContainerRef.current.innerHTML = '';
      
      // Append the video element from Zoom SDK
      videoContainerRef.current.appendChild(userVideo);
      // userVideo.className = "w-inherit  h-inherit object-cover";
    }
  }, [userVideo]);

  return (
    <>
      {/* The container that will hold the Zoom video */}
      <div 
        ref={videoContainerRef}
        className="w-full object-cover h-screen sm:h-[calc(100vh-315px)] sm:rounded-b-2xl lg:rounded-2xl mx-auto overflow-hidden"
      >
      </div>
      
      <div className="w-full absolute top-5 sm:top-10 flex items-center justify-between right-0 px-4 sm:px-6 xl:px-12">
        <span className="bg-black backdrop-blur-[8px] bg-opacity-30 rounded-full px-[29px] py-2 font-poppins font-medium text-sm sm:text-lg text-white">
          {userName}
        </span>
        <span className="w-10 h-10 sm:w-[60px] sm:h-[60px] bg-black backdrop-blur-[8px] bg-opacity-30 rounded-full grid place-content-center font-medium text-lg">
          <VoiceTrackIcon />
        </span>
      </div>
    </>
  );
};

export default UserVideoCall;