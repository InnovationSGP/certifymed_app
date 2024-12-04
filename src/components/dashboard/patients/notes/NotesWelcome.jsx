import React from "react";

const NotesWelcome = ({
  setState,
  heading,
  description,
  emergencycall,
  buttontext,
}) => {
  return (
    <>
      <div className="flex items-center flex-wrap justify-between mt-[29px] md:mt-16 gap-[29px] px-[35px]">
        <div>
          {heading && (
            <h2 className="section-heading leading-[51px] mb-2.5">{heading}</h2>
          )}
          {description && (
            <p className="text-mainblack font-semibold">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-x-[15px]">
          {buttontext && (
            <button
              onClick={setState ? setState : null}
              className="bg-primary primary-btn"
            >
              {buttontext}
            </button>
          )}

          {emergencycall && (
            <button className="bg-red primary-btn">Emergency call</button>
          )}
        </div>
      </div>
    </>
  );
};

export default NotesWelcome;
