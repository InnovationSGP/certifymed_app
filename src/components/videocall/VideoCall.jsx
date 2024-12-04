import MeVideoCall from "./MeVideoCall";
import UserVideoCall from "./UserVideoCall";
import VideoCallActions from "./VideoCallActions";

const VideoCall = ({ setShowMessageSlide, isShowMessageSlide }) => {
  return (
    <>
      <div className="w-full">
        <div className="relative bg-whisper sm:p-5 lg:p-6 xl:p-8">
          <UserVideoCall />
          <MeVideoCall />
          <div className="w-fit mx-auto my-[45px] flex items-center gap-3 sm:gap-4 sm:hidden absolute bottom-8 left-1/2 -translate-x-1/2">
            <VideoCallActions
              setShowMessageSlide={setShowMessageSlide}
              isShowMessageSlide={isShowMessageSlide}
            />
          </div>
        </div>
        <div className="w-fit mx-auto my-[45px] sm:flex items-center gap-[17px] hidden">
          <VideoCallActions
            setShowMessageSlide={setShowMessageSlide}
            isShowMessageSlide={isShowMessageSlide}
          />
        </div>
      </div>
    </>
  );
};

export default VideoCall;
