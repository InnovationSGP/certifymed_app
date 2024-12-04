"use client";
import AnalyticsCard from "@/components/common/AnalyticsCard";
import {
  PendingTestResults,
  TotalTestsDone,
  UpcomingTests,
} from "@/components/common/AppIcons";
import { useSelector } from "react-redux";

const TestAndResultsAnalytics = () => {
  const pendingTestResults = useSelector(
    (state) => state.patientsTests.pendingTestResults
  );
  const upcomingTests = useSelector(
    (state) => state.patientsTests.upcomingTests
  );
  const totalTestsDone = useSelector(
    (state) => state.patientsTests.totalTestsDone
  );
  return (
    <>
      <div className="grid lg:grid-cols-3 gap-3.5 sm:gap-[22px] px-5 md:px-[35px] mt-[26px]">
        <AnalyticsCard
          icon={<PendingTestResults />}
          count={pendingTestResults}
          description="Pending Test Results"
        />
        <AnalyticsCard
          icon={<UpcomingTests />}
          count={upcomingTests}
          description="Upcoming Tests"
        />
        <AnalyticsCard
          icon={<TotalTestsDone />}
          count={totalTestsDone}
          description="Total Tests Done"
        />
      </div>
    </>
  );
};

export default TestAndResultsAnalytics;
