"use client";
import ListHeading from "@/components/common/ListHeading";
import PatientsList from "@/components/common/PatientsList";
import RecentAppointments from "../patients/appointments/RecentAppointments";
import { useState } from "react";
import { useSelector } from "react-redux";

const DoctorDashboard = () => {
  // for all recent appointments on doctor dashboard
  const doctorDashboardData = useSelector(
    (state) => state.doctorDashboard.appointmentsHistory
  );

  // for sidebox patients data
  const patientsdata = useSelector(
    (state) => state.allConcernedPatients.patients
  );

  const [activePatient, setActivePatient] = useState(
    patientsdata[0]?.name || ""
  );

  return (
    <>
      <div className="lg:grid lg:grid-cols-3 gap-[22px] px-5 md:px-[35px] mt-[35px] mb-[103px]">
        <RecentAppointments type="Doctor" appointments={doctorDashboardData} />
        <div className="mt-[47px] lg:mt-0 rounded-t-xl lg:rounded-none bg-white lg:bg-transparent">
          <div className="px-4 lg:px-0">
            <ListHeading
              heading="Patients"
              href="/dashboard/doctor/patients-info"
            />
          </div>
          <hr />
          <div className="w-full bg-white lg:h-[531px] rounded-b-xl overflow-y-auto custom-scrollbar">
            <PatientsList
              patientsdatalist={patientsdata}
              activePatient={activePatient}
              setActivePatient={setActivePatient}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;
