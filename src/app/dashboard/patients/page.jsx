"use client";
import DashboardLayout from "@/components/common/DashboardLayout";
import DashboardWelcome from "@/components/common/DashboardWelcome";
import { appointments, postnote } from "@/components/common/Helper";
import ListHeading from "@/components/common/ListHeading";
import RecentAppointments from "@/components/dashboard/patients/appointments/RecentAppointments";
import DashboardAnalytics from "@/components/dashboard/patients/DashboardAnalytics";
import NotesCard from "@/components/dashboard/patients/notes/NotesCard";
import { setAppointmentsForPatients } from "@/redux/slices/patientAppointments";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const PatientsDashboardPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setAppointmentsForPatients({
        appointmentsHistory: appointments,
        upcomingAppointments: "2",
        completedAppointments: "7",
        cancelledAppointments: "3",
      })
    );
  }, [dispatch]);

  const allAppointments = useSelector(
    (state) => state.patientDashboard.appointmentsHistory
  );

  return (
    <>
      <DashboardLayout className="overflow-auto">
        <DashboardWelcome
          heading="Hi, John Mark"
          description="Welcome back!"
          emergencycall={true}
          buttontext="Book a Doctor"
        />
        <DashboardAnalytics />
        <div className="lg:grid lg:grid-cols-3 gap-[47px] sm:gap-[22px] mt-14 sm:mt-[30px] px-5 md:px-[35px] mb-20 xl:mb-[25px]">
          <RecentAppointments type="Patients" appointments={allAppointments} />
          <div className="bg-white rounded-xl mt-5 lg:mt-0">
            <div className="px-3 sm:px-0">
              <ListHeading heading="Notes" href={"/dashboard/patients/notes"} />
            </div>
            <hr className="border-super`Silver"></hr>
            <div className="px-[19px] py-5 sm:pt-[15px] space-y-[15px] sm:h-[529px] sm:overflow-y-auto custom-scrollbar ">
              {postnote.slice(0, 3).map((note, index) => (
                <NotesCard
                  note={note}
                  key={index}
                  additionalclass="border border-superSilver"
                />
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default PatientsDashboardPage;
