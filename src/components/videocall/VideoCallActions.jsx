import {
  CallIcon,
  MikeIcon,
  VideoCallingIcon,
  VideoMessage,
} from "../common/AppIcons";

const VideoCallActions = ({ isShowMessageSlide, setShowMessageSlide, isAudioMuted, setIsAudioMuted, client, isVideoMuted, setIsVideoMuted, setJoin}) => {

  const onMicrophoneClick = async () => {
    const mediaStream = client.current.getMediaStream();
    isAudioMuted ? await mediaStream?.unmuteAudio() : await mediaStream?.muteAudio();
    console.log("isAudioMuted: ", client.current.getCurrentUserInfo().muted);
    setIsAudioMuted(client.current.getCurrentUserInfo().muted);
  };

  const onVideoClick = async () => {
    
    if(isVideoMuted){
      console.log("in if")
      const mediaStream = client.current.getMediaStream();
      await mediaStream?.startVideo();
      setIsVideoMuted(!mediaStream.isCapturingVideo());
    } else {
      console.log("in else")
      const mediaStream = client.current.getMediaStream();
      await mediaStream?.stopVideo();
      setIsVideoMuted(!mediaStream.isCapturingVideo());
    }
  };

  const leaveSession = async () => {
    console.log("leaving session")
    await client.current.leave();
    setJoin(false);
  }

  return (
    <>
      <button onClick={onMicrophoneClick} className="w-[60px] h-[60px] bg-brilliantblue rounded-full grid place-content-center">
        <MikeIcon isAudioMuted={isAudioMuted} />
      </button>
      <button onClick={onVideoClick} className="w-[60px] h-[60px] bg-brilliantblue rounded-full grid place-content-center">
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
      <button onClick={leaveSession} className="w-[60px] sm:w-auto h-[60px] bg-lightred font-medium text-white font-poppins sm:px-10 rounded-full flex items-center justify-center">
        <span className="hidden sm:block">End Call</span>
        <span className="sm:hidden m-auto">
          <CallIcon />
        </span>
      </button>
    </>
  );
};

export default VideoCallActions;
