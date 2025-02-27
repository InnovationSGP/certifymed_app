import DashboardLayout from "@/components/common/DashboardLayout";
import DoctorAnalytics from "@/components/dashboard/doctor/DoctorAnalytics";
import DoctorDashboard from "@/components/dashboard/doctor/DoctorDashboard";
import NotesWelcome from "@/components/dashboard/patients/notes/NotesWelcome";

const DoctorDashboardPage = () => {
  // const dispatch = useDispatch();
  // const user = useSelector(selectUser);

  // useEffect(() => {
  //   dispatch(
  //     setDoctorAppointments({
  //       appointmentsHistory: patientappointments,
  //       upcomingAppointments: "3",
  //       completedAppointments: "18",
  //       unreadMessages: "7",
  //     })
  //   );

  //   dispatch(setPatients(patientsdatalist));
  // }, [dispatch]);

  // const userFullName = `Dr. ${user.firstName || ""} ${
  //   user.lastName || ""
  // }`.trim();

  return (
    <>
      <DashboardLayout className="overflow-auto">
        <NotesWelcome
          heading={`Hi,doctor`}
          description="Welcome back!"
        />
        <DoctorAnalytics />
        <DoctorDashboard />
      </DashboardLayout>
    </>
  );
};

export default DoctorDashboardPage;
