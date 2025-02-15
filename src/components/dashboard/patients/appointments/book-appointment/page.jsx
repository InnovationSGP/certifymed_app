"use client";
import { useState } from "react";
import Stepper from "@/components/dashboard/patients/appointments/book-appointment/stepper/Stepper";
import Choose_Provider from "@/components/dashboard/patients/appointments/book-appointment/stepperComponents/choose-provider";
import Choose_Appointment from "@/components/dashboard/patients/appointments/book-appointment/stepperComponents/choose-appointment";
import Choose_Pay from "@/components/dashboard/patients/appointments/book-appointment/stepperComponents/choose-pay";
import Choose_Date_Time from "@/components/dashboard/patients/appointments/book-appointment/stepperComponents/choose-date-time";
import Complete_Booking from "@/components/dashboard/patients/appointments/book-appointment/stepperComponents/complete-booking";

const FindProvider = ({setIsBookAppointment}) => {
  const [tabNumber, setTabNumber] = useState(1);
  const handleStepClick = (step) => {
    setTabNumber(step);
  };
  return (
    <>
      <section className="w-full overflow-hidden">
        <div className="mt-6 justify-center items-start flex flex-col ">
          <Stepper currentStep={tabNumber} onStepClick={handleStepClick} />
          <div className="w-full p-4 h-full mt-12 flex items-center justify-center">
            {tabNumber == 1 && (
              <Choose_Provider tabNumber={tabNumber} setTabNumber={setTabNumber} />
            )}
            {tabNumber == 2 && (
              <Choose_Appointment tabNumber={tabNumber} setTabNumber={setTabNumber} />
            )}
            {tabNumber == 3 && (
              <Choose_Pay tabNumber={tabNumber} setTabNumber={setTabNumber} />
            )}
            {tabNumber == 4 && (
              <Choose_Date_Time tabNumber={tabNumber} setTabNumber={setTabNumber} />
            )}
            {tabNumber == 5 && (
              <Complete_Booking tabNumber={tabNumber} setTabNumber={setTabNumber} setIsBookAppointment={setIsBookAppointment} />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default FindProvider;
