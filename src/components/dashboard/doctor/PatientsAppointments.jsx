import PatientsAppointmentsListItem from "./PatientsAppointmentsListItem";

const PatientsAppointments = ({
  patientsapoinmenthistory,
  upcomingappointment,
}) => {
  return (
    <>
      <div className="mt-11">
        <h3 className="text-lg font-medium  text-mainblack">
          Appointment History
        </h3>
        <table className="min-w-full mt-2 mb-11">
          <thead className="bg-graywhite">
            <tr>
              <th className="table-heading">ID</th>
              <th className="table-heading">Date</th>
              <th className="table-heading">Mode</th>
              <th className="table-heading">Status</th>
              <th className="table-heading">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {patientsapoinmenthistory.map((obj, index) => (
              <PatientsAppointmentsListItem obj={obj} key={index} />
            ))}
          </tbody>
        </table>
        {/* UPCOMING APOINMENTS */}
        <h3 className="text-lg font-medium  text-mainblack">
          Upcoming Appointment
        </h3>
        <table className="min-w-full mt-2">
          <thead>
            <tr>
              <th className="table-heading">ID</th>
              <th className="table-heading">Date</th>
              <th className="table-heading">Mode</th>
              <th className="table-heading">Status</th>
              <th className="table-heading">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {upcomingappointment.map((obj, index) => (
              <PatientsAppointmentsListItem obj={obj} key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PatientsAppointments;
