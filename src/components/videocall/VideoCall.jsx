import MeVideoCall from "./MeVideoCall";
import UserVideoCall from "./UserVideoCall";
import VideoCallActions from "./VideoCallActions";
import SendMessages from "./SendMessages";

import { useEffect } from "react";
import ZoomVideo from "@zoom/videosdk";
import { useRef, useState } from "react";
import { VideoQuality } from "@zoom/videosdk";

const VideoCall = ({session, setJoin}) => {
  const [userVideo, setUserVideo ] = useState(null);
  const [meVideo, setMeVideo] = useState(null);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isCameraStarting, setIsCameraStarting] = useState(false);
  const [isShowMessageSlide, setShowMessageSlide] = useState(false);
  const client = useRef(ZoomVideo.createClient());
  const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfa2V5IjoiNnltUHNHVHlCS2RRQzhNcGZPdkpnd0JhbjRGY1d3d3V1TWRzIiwidHBjIjoidGVzdCIsInJvbGVfdHlwZSI6MSwidmVyc2lvbiI6MSwiaWF0IjoxNzQzNzYxMTAwLCJleHAiOjE3NDM3NjgzMDB9.vEXp1ERjGihj0Rx4Gjvh2JJfx0-hmRmjbiOYxl7_XRY";
  const userName = "doctor";
  const meName = "patient"
  useEffect(() => {
    console.log()
    const startCall = async () => {
      try {
        await client.current.init("en-US", "Global", { patchJsMedia: true });
        
        client.current.on("peer-video-state-change", handleVideoStateChange);
        client.current.on("user-added", handleUserAdded);
        client.current.on("user-removed", handleUserRemoved);
        
        
        await client.current.join(session, jwt, userName);
        const users = client.current.getAllUser();
        console.log("users: ", users.length);
        const currentUserId = client.current.getCurrentUserInfo().userId;
        const otherUserId = users.find((user) => user.userId !== currentUserId)?.userId;
        const mediaStream = client.current.getMediaStream();
        await mediaStream?.startVideo();
        await mediaStream?.startAudio();
        await mediaStream?.muteAudio()
        if(users.length > 1){
          await attachUserVideo(otherUserId);
          await startLocalVideo();
        }else{
          await attachUserVideo(currentUserId);
        }
        
      } catch(err) {
        console.error(err);
      }
    }
    
    startCall();
    
    return () => {
      const mediaStream = client.current.getMediaStream();
      if (mediaStream) {
        mediaStream.stopVideo();
      }
      
      client.current.off("peer-video-state-change", handleVideoStateChange);
      client.current.off("user-added", handleUserAdded);
      client.current.off("user-removed", handleUserRemoved);
      
      client.current.leave();
    };
  }, [session]);
  
  const startLocalVideo = async () => {
    if (isCameraStarting) return;
    
    try {
      setIsCameraStarting(true);
      const mediaStream = client.current.getMediaStream();
      setIsAudioMuted(mediaStream.isAudioMuted());
      setIsVideoMuted(!mediaStream.isCapturingVideo());
      const currentUserId = client.current.getCurrentUserInfo().userId;
      const myVideo = await mediaStream.attachVideo(currentUserId, VideoQuality.Video_720P);
      setMeVideo(myVideo);
      setIsCameraStarting(false);
    } catch (error) {
      console.error("Error starting local video:", error);
      setIsCameraStarting(false);
    }
  };
  
  const handleVideoStateChange = async (payload) => {
    console.log("peer-video-state-change:", payload);
    if (payload.action === 'Start') {
      attachUserVideo(payload.userId);
    }
  };
  
  const handleUserAdded = async (payload) => {
    console.log("user-added:", payload);
    const currentUserId = client.current.getCurrentUserInfo().userId;
    if (payload[0].userId!== currentUserId) {
      // const mediaStream = client.current.getMediaStream();
      try {
          await attachUserVideo(payload[0].userId);
          await startLocalVideo();
      } catch (err) {
        console.log("Could not check user video status:", err);
      }
    }
  };
  
  const handleUserRemoved = (payload) => {
    console.log("user-removed:", payload);
    // If the removed user was the one we were viewing, clear the video
    if (userVideo && userVideo.userId === payload.userId) {
      setUserVideo(null);
    }
  };
  
  const attachUserVideo = async (userId) => {
    try {
      const mediaStream = client.current.getMediaStream();
      const userVideo = await mediaStream.attachVideo(userId, VideoQuality.Video_1080P);
      setUserVideo(userVideo);
    } catch (err) {
      console.error("Error attaching user video:", err);
    }
  };

 
  
  return (
    <>
      <div className="w-full">
        <div className="relative bg-whisper sm:rounded-b-2xl lg:rounded-2xl ">
          <UserVideoCall userVideo={userVideo} userName={userName} />
          {
            meVideo && <MeVideoCall meVideo={meVideo} userName={meName} />
          }
          
          <div className="w-fit mx-auto my-[45px] flex items-center gap-3 sm:gap-4 sm:hidden absolute bottom-8 left-1/2 -translate-x-1/2">
            <VideoCallActions
              setShowMessageSlide={setShowMessageSlide}
              isShowMessageSlide={isShowMessageSlide}
            />
          </div>
        </div>
        <div className="w-fit mx-auto my-[45px] sm:flex items-center gap-[17px] hidden">
          <VideoCallActions
            isAudioMuted={isAudioMuted}
            client={client}
            setIsAudioMuted={setIsAudioMuted}
            setShowMessageSlide={setShowMessageSlide}
            isShowMessageSlide={isShowMessageSlide}
            isVideoMuted={isVideoMuted}
            setIsVideoMuted={setIsVideoMuted}
            setJoin={setJoin}
          />
        </div>
      </div>
      <SendMessages
                setShowMessageSlide={setShowMessageSlide}
                isShowMessageSlide={isShowMessageSlide}
                client={client}
              />
    </>
  );
};

export default VideoCall;
