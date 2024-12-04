"use client";
import DashboardNav from "@/components/common/DashboardNav";
import SendMessages from "@/components/videocall/SendMessages";
import VideoCall from "@/components/videocall/VideoCall";
import { useState } from "react";

// export const metadata = {
//   title: " CertifyMed - Video call",
//   description:
//     "Discover the future of healthcare through  CertifyMed: top-tier medical care at your fingertips. No more waiting—access qualified professionals instantly from home.",
// };
const VideoCallPage = () => {
  const [isShowMessageSlide, setShowMessageSlide] = useState(false);
  return (
    <>
      <section className="w-full overflow-hidden">
        <DashboardNav />
        <div className="w-full sm:h-[calc(100vh-80px)] -mt-[15px] flex flex-col sm:flex-row justify-between">
          <VideoCall
            setShowMessageSlide={setShowMessageSlide}
            isShowMessageSlide={isShowMessageSlide}
          />
          <SendMessages
            setShowMessageSlide={setShowMessageSlide}
            isShowMessageSlide={isShowMessageSlide}
          />
        </div>
      </section>
    </>
  );
};

export default VideoCallPage;
