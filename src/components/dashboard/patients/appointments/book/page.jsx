"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Stepper from "@/components/common/Stepper";
import ChooseProvider from "@/components/dashboard/patients/appointments/book/BookComponents/ChooseProvider";
import ChooseAppointment from "@/components/dashboard/patients/appointments/book/BookComponents/ChooseAppointment";
import ChoosePay from "@/components/dashboard/patients/appointments/book/BookComponents/ChoosePay";
import ChooseDateTime from "@/components/dashboard/patients/appointments/book/BookComponents/ChooseDateTime";
import CompleteBooking from "@/components/dashboard/patients/appointments/book/BookComponents/CompleteBooking";

const FindProvider = ({ setIsBookAppointment }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get tab from query params, default to 1
  const tabNumber = parseInt(searchParams.get("tab") || "1", 10);

  // Update URL when step is clicked
  const handleStepClick = (step) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("tab", step.toString());
    router.push(`?${newParams.toString()}`);
  };

  return (
    <section className="w-full overflow-hidden">
      <div className="mt-6 justify-center items-start flex flex-col">
        <Stepper currentStep={tabNumber} onStepClick={handleStepClick} />
        <div className="w-full p-4 h-full mt-12 flex items-center justify-center">
          {tabNumber === 1 && <ChooseProvider tabNumber={tabNumber} setTabNumber={handleStepClick} />}
          {tabNumber === 2 && <ChooseAppointment tabNumber={tabNumber} setTabNumber={handleStepClick} />}
          {tabNumber === 3 && <ChoosePay tabNumber={tabNumber} setTabNumber={handleStepClick} />}
          {tabNumber === 4 && <ChooseDateTime tabNumber={tabNumber} setTabNumber={handleStepClick} />}
          {tabNumber === 5 && (
            <CompleteBooking tabNumber={tabNumber} setTabNumber={handleStepClick} setIsBookAppointment={setIsBookAppointment} />
          )}
        </div>
      </div>
    </section>
  );
};

export default FindProvider;
