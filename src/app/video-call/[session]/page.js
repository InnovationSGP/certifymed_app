"use client";
import DashboardNav from "@/components/common/DashboardNav";
import VideoCall from "@/components/videocall/VideoCall";
import { set } from "date-fns";
import { useState, useRef } from "react";

const VideoCallPage = ({ params }) => {
  const session = params.session;

 
  const [join, setJoin] = useState(true);

  const startCall = async () => {
    try{
      setJoin(true);
    }catch(err){
      console.error(err);
    }
  }

  return (
    <>
      <section className="w-full overflow-hidden">
        <DashboardNav />
        <div className="w-full sm:h-[calc(100vh-80px)] -mt-[15px] flex flex-col sm:flex-row justify-between relative">
          {join ? (
              <VideoCall
                session={session}
                setJoin={setJoin}
              />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={startCall}
                className="px-6 py-3 text-white bg-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-700"
              >
                Join
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default VideoCallPage;
