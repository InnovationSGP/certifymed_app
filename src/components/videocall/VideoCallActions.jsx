import {
  CallIcon,
  MikeIcon,
  VideoCallingIcon,
  VideoMessage,
} from "../common/AppIcons";

const VideoCallActions = ({ isShowMessageSlide, setShowMessageSlide }) => {
  return (
    <>
      <button className="w-[60px] h-[60px] bg-brilliantblue rounded-full grid place-content-center">
        <MikeIcon />
      </button>
      <button className="w-[60px] h-[60px] bg-brilliantblue rounded-full grid place-content-center">
        <VideoCallingIcon />
      </button>
      <button
        className={`${
          isShowMessageSlide ? "bg-brilliantblue" : "bg-paleblue "
        } w-[60px] h-[60px] rounded-full grid place-content-center transition-all duration-300 ease-in-out`}
        onClick={() => setShowMessageSlide(!isShowMessageSlide)}
      >
        <VideoMessage isShowMessageSlide={isShowMessageSlide} />
      </button>
      <button className="w-[60px] sm:w-auto h-[60px] bg-lightred font-medium text-white font-poppins sm:px-10 rounded-full flex items-center justify-center">
        <span className="hidden sm:block">End Call</span>
        <span className="sm:hidden m-auto">
          <CallIcon />
        </span>
      </button>
    </>
  );
};

export default VideoCallActions;
