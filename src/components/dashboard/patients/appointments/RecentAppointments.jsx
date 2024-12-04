"use client";
import ListHeading from "@/components/common/ListHeading";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import RecentAppointmentsCard from "./RecentAppointmentsCard";
import RecentAppointmentsListItem from "./RecentAppointmentsListItem";

const RecentAppointments = ({ type, appointments }) => {

  return (
    <>
      <div className="col-span-3 lg:col-span-2">
        <div>
          <ListHeading heading="Recent Appointments" />
          {/* DESKTOP APPOINTMENTS  */}
          <div className="w-full overflow-y-auto custom-scrollbar hidden md:block">
            <table className="min-w-full bg-white rounded-b-xl ">
              <thead>
                <tr>
                  <th className="table-heading">ID</th>
                  <th className="table-heading">{type === "Patients" ? "Doctor" : "Patient"}</th>
                  <th className="table-heading">Date</th>
                  <th className="table-heading">Mode</th>
                  <th className="table-heading">Status</th>
                  <th className="table-heading">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {appointments?.map((appointment, index) => (
                  <RecentAppointmentsListItem
                    type={type}
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
              {appointments?.map((appointment, index) => (
                <SwiperSlide key={index}>
                  <RecentAppointmentsCard appointment={appointment} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentAppointments;
