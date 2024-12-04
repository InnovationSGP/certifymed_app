import React from "react";
import { SendMessagesIcon } from "../common/AppIcons";

const VideoMessageInput = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
}) => {
  return (
    <>
      <div className=" w-full bg-whiteSmoke flex py-2.5 pr-2.5 pl-5 items-center rounded-full sticky bottom-2">
        <input
          className="w-full bg-transparent outline-none text-flannelPajamas font-medium"
          type="text"
          placeholder="Type Something..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="w-full max-w-[50px] h-[50px] bg-brilliantblue grid place-content-center rounded-full"
          onClick={handleSendMessage}
        >
          <SendMessagesIcon />
        </button>
      </div>
    </>
  );
};

export default VideoMessageInput;
