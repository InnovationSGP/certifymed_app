"use client";

import { XIcon } from "lucide-react";
import { useState } from "react";
import MessageListItem from "./MessageListItem";
import VideoMessageInput from "./VideoMessageInput";
import { useEffect } from "react";


const SendMessages = ({ setShowMessageSlide, isShowMessageSlide, client }) => {

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatClient = useRef<any>(null);


  useEffect(() => {
    console.log()
    const initializeMessage = async () => {
      chatClient.current = client.current.getChatClient();
      client.current.on("chat-on-message", (payload) => {
        console.log("message payload: ", payload)
        if(payload.sender.userId !== client.current.getCurrentUserInfo().userId) {
          handleIncomingMessage(payload);
        }
      });
    }
    initializeMessage();
    return () => {
      client.current.off("chat-on-message", (payload) => {
        if(payload.sender.userId !== client.current.getCurrentUserInfo().userId) {
          handleIncomingMessage(payload);
        }
      });
    };
  }, []);

  const handleIncomingMessage = (payload) => {    
    let sender = payload.sender.name;
    let text = payload.message;
    if (text) {
      setMessages((prev) => [
        ...prev,
        { sender, text }
      ]);
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;
    
    try {
      console.log("Attempting to send message:", newMessage);
      
      await client.current.sendToAll(newMessage);
      setMessages((prev) => [...prev, { sender: "You", text: newMessage }]);
      setNewMessage("");
      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
      // Add message to local state anyway to improve UX
      setMessages((prev) => [...prev, { sender: "You (not sent)", text: newMessage }]);
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
            handleSendMessage={sendMessage}
            setNewMessage={setNewMessage}
            newMessage={newMessage}
          />
        </div>
      </div>
    </>
  );
};

export default SendMessages;
