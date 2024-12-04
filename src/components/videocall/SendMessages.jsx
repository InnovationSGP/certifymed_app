"use client";

import { XIcon } from "lucide-react";
import { useState } from "react";
import MessageListItem from "./MessageListItem";
import VideoMessageInput from "./VideoMessageInput";

const SendMessages = ({ setShowMessageSlide, isShowMessageSlide }) => {
  const [messages, setMessages] = useState([
    {
      sender: "Dr. Anita Joseph",
      text: "Hey, I’ll text you the name of the drug here",
      time: "11:01 AM",
    },
    {
      sender: "Me",
      text: "Okay, thanks",
      time: "11:02 AM",
    },
    {
      sender: "Dr. Anita Joseph",
      text: "The name is tetracyline",
      time: "11:05 AM",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setMessages([
        ...messages,
        { sender: "Me", text: newMessage, time: currentTime },
      ]);
      setNewMessage("");
    }
  };
  return (
    <>
      <div
        className={` fixed sm:static transition-all duration-300 ease-in-out bg-white w-full sm:max-w-[340px] lg:max-w-[380px] xl:max-w-[421px] ${
          isShowMessageSlide
            ? " bottom  sm:translate-x-[421px] sm:-ml-[421px]"
            : "-bottom-[200%]"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-[26px]">
          <h3 className="text-lg font-semibold font-poppins py-4 border-b">
            In-call Messages
          </h3>
          <button
            className="sm:hidden"
            onClick={() => setShowMessageSlide(false)}
          >
            <XIcon />
          </button>
        </div>
        <div className="border-l px-4 md:px-7 h-screen relative">
          <div className="pt-2 sm:pt-[33px] overflow-y-auto h-screen hide-scrollbar">
            {messages.map((msg, index) => (
              <MessageListItem msg={msg} key={index} />
            ))}
          </div>
          {/* SEND MESSAGE  */}
          <VideoMessageInput
            handleSendMessage={handleSendMessage}
            setNewMessage={setNewMessage}
            newMessage={newMessage}
          />
        </div>
      </div>
    </>
  );
};

export default SendMessages;
