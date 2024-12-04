import React from "react";
import RecentAppointmentsListItem from "../dashboard/patients/appointments/RecentAppointmentsListItem";
import { appointments } from "../common/Helper";

const TestHistory = () => {
  return (
    <>
      <div className="px-[35px] mt-[35px] mb-[30px]">
        <div className="flex justify-between items-center bg-white pl-[21px] pr-[29px] py-5 rounded-t-xl">
          <h2 className="text-lg font-semibold">Test History</h2>
          <button className="font-semibold text-primary">See all</button>
        </div>
        <div className="w-full overflow-y-auto custom-scrollbar ">
          <table className="min-w-full bg-[#fbfbfb] rounded-b-xl">
            <thead>
              <tr>
                <th className="table-heading">ID</th>
                <th className="table-heading">Doctor</th>
                <th className="table-heading">Date</th>
                <th className="table-heading">Mode</th>
                <th className="table-heading">Status</th>
                <th className="table-heading">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appointments.map((appointment, index) => (
                <RecentAppointmentsListItem
                  appointment={appointment}
                  key={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TestHistory;
