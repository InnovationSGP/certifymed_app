import Image from "next/image";
import React from "react";

const MessageListItem = ({ msg }) => {
  return (
    <>
      <article className="flex gap-4 sm:gap-5 items-center mt-4 sm:mt-7 overflow-y-auto hide-scrollbar">
        <Image
          className="max-w-[45px] max-h-[45px] w-[45px] h-[45px] sm:max-w-[45px] sm:max-h-[55px] sm:w-[55px] sm:h-[55px] object-cover rounded-full"
          src="/images/doctor.png"
          width={55}
          height={55}
          alt={msg.sender}
        />
        <div className="bg-whiteSmoke p-2.5 sm:p-3 rounded-[10px] w-full">
          <h6 className="text-[10px] font-poppins font-medium text-industrialAge ">
            {msg.sender}
          </h6>
          <p className="font-medium font-poppins text-maritimeBlue text-sm sm:text-base sm:leading-[29px]">
            {msg.text}
          </p>
        </div>
        <span className="text-uniformGrey text-[10px] font-medium whitespace-nowrap">
          {msg.time}
        </span>
      </article>
    </>
  );
};

export default MessageListItem;
