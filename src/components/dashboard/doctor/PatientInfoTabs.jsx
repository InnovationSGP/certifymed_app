"use client";
import PatientsAppointments from "@/components/dashboard/doctor/PatientsAppointments";
import PatientsGeneralInformation from "@/components/dashboard/doctor/PatientsGeneralInformation";
import PatientsNotes from "@/components/dashboard/doctor/PatientsNotes";
import PatientsTestAndResults from "@/components/dashboard/doctor/PatientsTestAndResults";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PatientInfoTabs = ({ patientsdetails, buttonslist }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "patient-info"
  );

  // Update URL when tab changes
  const handleTabChange = (slug) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("tab", slug);
    router.push(`/dashboard/doctor/patients-info?${newParams.toString()}`);
    setActiveTab(slug);
  };

  // Sync with URL changes
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl && buttonslist.some((btn) => btn.slug === tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams, buttonslist]);

  return (
    <div>
      <div className="flex items-center gap-[7px] justify-between bg-lightshade rounded-[30px] p-[7px] mt-10">
        {buttonslist?.map((item, i) => (
          <button
            onClick={() => handleTabChange(item.slug)}
            key={i}
            className={`${
              activeTab === item.slug ? "bg-white" : ""
            } w-full py-[9px] rounded-[30px] text-sm font-medium font-poppins text-mainblack`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {activeTab === "patient-info" && (
        <PatientsGeneralInformation information={patientsdetails.information} />
      )}
      {activeTab === "appointments" && (
        <PatientsAppointments
          patientsapoinmenthistory={patientsdetails.patientsapoinmenthistory}
          upcomingappointment={patientsdetails.upcomingappointment}
        />
      )}
      {activeTab === "notes" && (
        <PatientsNotes postnote={patientsdetails.postnote} />
      )}
      {activeTab === "tests-results" && (
        <PatientsTestAndResults
          testsandresults={patientsdetails.testsandresults}
        />
      )}
    </div>
  );
};

export default PatientInfoTabs;
