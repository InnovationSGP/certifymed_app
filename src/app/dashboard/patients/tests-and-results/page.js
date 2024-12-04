"use client";
import AppointmentHistoryMobileList from "@/components/common/AppointmentHistoryMobileList";
import DashboardLayout from "@/components/common/DashboardLayout";
import DashboardWelcome from "@/components/common/DashboardWelcome";
import { appointments } from "@/components/common/Helper";
import AppointmentList from "@/components/dashboard/patients/appointments/AppointmentList";
import TestAndResultsAnalytics from "@/components/dashboard/patients/testsandresult/TestAndResultsAnalytics";
import { setPatientTests } from "@/redux/slices/patientsTestsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TestAndResultsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setPatientTests({
        testHistory: appointments,
        pendingTestResults: "3",
        upcomingTests: "1",
        totalTestsDone: "13",
      })
    );
  }, [dispatch]);

  const testHistory = useSelector((state) => state.patientsTests.testHistory);

  return (
    <>
      <DashboardLayout className="overflow-auto">
        <DashboardWelcome
          heading="Tests and Results"
          buttontext="Book a Test"
        />
        <TestAndResultsAnalytics />
        <button className="bg-primary primary-btn mx-auto mt-[39px] sm:hidden">
          Book a Test
        </button>

        <div className="hidden md:block">
          <AppointmentList type="Patients" listType="tests" dataSet={testHistory} />
        </div>
        <AppointmentHistoryMobileList
          testHistory={testHistory}
          heading="Tests and Results"
        />
      </DashboardLayout>
    </>
  );
};

export default TestAndResultsPage;
