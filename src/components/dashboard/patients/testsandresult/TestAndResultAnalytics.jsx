import React from "react";
import {
  PendingTestResults,
  TotalTestsDone,
  UpcomingTests,
} from "../common/AppIcons";

const TestAndResultAnalytics = () => {
  return (
    <>
      <div className="grid lg:grid-cols-3 gap-[22px] px-[35px] mt-[26px]">
        <article className="flex gap-x-[17px] rounded-xl bg-white px-[22px] py-[33px]">
          <span className="bg-forcefulOrange bg-opacity-20 rounded-full w-[61px] h-[61px] grid place-content-center">
            <PendingTestResults />
          </span>
          <div>
            <span className="section-heading">1</span>
            <h6 className="text-shadesOn  mt-2">Pending Test Results</h6>
          </div>
        </article>
        <article className="flex gap-x-[17px] rounded-xl bg-white px-[22px] py-[33px]">
          <span className="bg-[#BB6BD933] bg-opacity-20 rounded-full w-[61px] h-[61px] grid place-content-center">
            <UpcomingTests />
          </span>
          <div>
            <span className="section-heading">3</span>
            <h6 className="text-shadesOn  mt-2">Upcoming Tests</h6>
          </div>
        </article>
        <article className="flex gap-x-[17px] rounded-xl bg-white px-[22px] py-[33px]">
          <span className="bg-[#3498DB33] bg-opacity-20 rounded-full w-[61px] h-[61px] grid place-content-center">
            <TotalTestsDone />
          </span>
          <div>
            <span className="section-heading">2</span>
            <h6 className="text-shadesOn  mt-2">Total Tests Done</h6>
          </div>
        </article>
      </div>
    </>
  );
};

export default TestAndResultAnalytics;
