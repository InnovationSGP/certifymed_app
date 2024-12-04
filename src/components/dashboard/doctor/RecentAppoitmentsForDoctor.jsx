"use client";
import ListHeading from "@/components/common/ListHeading";
import React from "react";
import RecentAppointmentsListItem from "../patients/appointments/RecentAppointmentsListItem";
import { patientappointments } from "@/components/common/Helper";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import RecentAppointmentsCard from "../patients/appointments/RecentAppointmentsCard";

const RecentAppoitmentsForDoctor = () => {
  return (
    <>
      <div className="col-span-3  lg:col-span-2">
        <ListHeading heading="Recent Appointments" />
        {/* DESKTOP APPOINTMENTS  */}
        <div className="w-full overflow-y-auto custom-scrollbar  hidden md:block">
          <table className="min-w-full bg-graywhite rounded-b-xl">
            <thead>
              <tr>
                <th className="table-heading">ID</th>
                <th className="table-heading">Patient</th>
                <th className="table-heading">Date</th>
                <th className="table-heading">Mode</th>
                <th className="table-heading">Status</th>
                <th className="table-heading">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {patientappointments?.map((appointment, index) => (
                <RecentAppointmentsListItem
                  appointment={appointment}
                  key={index}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE APPOINTMENTS  */}
        <div className="md:hidden recent-appointments-slider">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            breakpoints={{
              768: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
            }}
          >
            {patientappointments?.map((appointment, index) => (
              <SwiperSlide key={index}>
                <RecentAppointmentsCard appointment={appointment} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default RecentAppoitmentsForDoctor;
