import React from "react";
import DashboardLayout from "./DashboardLayout";
import NotesWelcome from "../dashboard/patients/notes/NotesWelcome";

const DoctorScreenDashboardLayout = () => {
  return (
    <>
      <DashboardLayout>
        <NotesWelcome />
      </DashboardLayout>
    </>
  );
};

export default DoctorScreenDashboardLayout;
