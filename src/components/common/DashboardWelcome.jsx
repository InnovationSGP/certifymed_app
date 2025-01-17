import React from "react";

const DashboardWelcome = ({
  heading,
  description,
  emergencycall,
  buttontext,
}) => {
  return (
    <>
      <div className="flex items-center flex-wrap justify-between mt-[29px] sm:mt-10 md:mt-16 gap-[29px] px-5 md:px-[35px]">
        <div>
          {heading && (
            <h2 className="section-heading leading-[51px] mb-1.5 sm:mb-2.5">
              {heading}
            </h2>
          )}
          {description && (
            <p className="text-mainblack font-semibold font-poppins">
              {description}
            </p>
          )}
        </div>
        <div className="sm:flex items-center gap-x-[15px] hidden">
          {buttontext && (
            <button className="bg-primary primary-btn ">{buttontext}</button>
          )}

          {emergencycall && (
            <button className="emergency-btn">Emergency call</button>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardWelcome;
