"use client";
import { Message, SearchIcon, VideoIcon } from "@/components/common/AppIcons";
import DashboardLayout from "@/components/common/DashboardLayout";
import Image from "next/image";
import { useState, Suspense, useEffect } from "react";
import PatientInfoTabs from "./PatientInfoTabs";
import { patientsdatalist } from "@/components/common/Helper";
import PatientsList from "@/components/common/PatientsList";
import { useDispatch, useSelector } from "react-redux";
import { setPatients } from "@/redux/slices/allPatientsForDoctorSlice";

const PatientsInfo = () => {
  const buttonslist = [
    { name: "Patient's Info", slug: "patient-info" },
    { name: "Appointments", slug: "appointments" },
    { name: "Notes", slug: "notes" },
    { name: "Tests & Results", slug: "tests-results" },
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const [activePatient, setActivePatient] = useState("Ebuka Williams");
  const dispatch = useDispatch();
  useEffect(() => {

    // call an api to get all the patients list
    // 1. make an api call using async function
    // 2. we will store that data in any variable
    // 3. we will dispatch that varianle in below function
    

    dispatch(setPatients(patientsdatalist));
  }, [dispatch]);
  const allPatients = useSelector(
    (state) => state.allConcernedPatients.patients
  );

  const filteredPatients = allPatients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentPatient = allPatients.find(
    (patient) => patient.name === activePatient
  );

  const patientsdetails = {
    information: {
      dob: "23, April 1975",
      age: "48",
      sex: "Male",
      height: "195 CM",
      weight: "85KG",
      nationality: "Nigerian",
    },
    patientsapoinmenthistory: [
      {
        id: "AP001",
        date: "08 Jan 2024",
        mode: "Online",
        status: "Completed",
      },
      {
        id: "AP001",
        date: "08 Jan 2024",
        mode: "Online",
        status: "Completed",
      },
      {
        id: "AP001",
        date: "08 Jan 2024",
        mode: "Online",
        status: "Completed",
      },
      {
        id: "AP001",
        date: "08 Jan 2024",
        mode: "Online",
        status: "Completed",
      },
      {
        id: "AP001",
        date: "08 Jan 2024",
        mode: "Online",
        status: "Completed",
      },
    ],
    upcomingappointment: [
      {
        id: "AP001",
        date: "11 Mar 2024",
        mode: "Online",
        status: "Pending",
      },
    ],
    testsandresults: [
      {
        date: "08 Jan 2024",
        testfor: "Malaria",
        conductedat: "Gilmore Labs",
        result: "Negative",
      },
      {
        date: "08 Jan 2024",
        testfor: "Malaria",
        conductedat: "Gilmore Labs",
        result: "Negative",
      },
      {
        date: "08 Jan 2024",
        testfor: "Malaria",
        conductedat: "Gilmore Labs",
        result: "Negative",
      },
      {
        date: "08 Jan 2024",
        testfor: "Malaria",
        conductedat: "Gilmore Labs",
        result: "Negative",
      },
      {
        date: "08 Jan 2024",
        testfor: "Malaria",
        conductedat: "Gilmore Labs",
        result: "Negative",
      },
      {
        date: "08 Jan 2024",
        testfor: "Malaria",
        conductedat: "Gilmore Labs",
        result: "Negative",
      },
      {
        date: "08 Jan 2024",
        testfor: "Malaria",
        conductedat: "Gilmore Labs",
        result: "Negative",
      },
      {
        date: "08 Jan 2024",
        testfor: "Malaria",
        conductedat: "Gilmore Labs",
        result: "Negative",
      },
    ],
    postnote: [
      {
        heading: "Medical Consultation Summary",
        description:
          "Following our consultation on February 28, 2024, I have diagnosed John Doe with hypertension and prescribed",
        prescription: "1 Prescription",
      },
      {
        heading: "Medical Consultation Summary",
        description:
          "Following our consultation on February 28, 2024, I have diagnosed John Doe with hypertension and prescribed",
        prescription: "1 Prescription",
      },
      {
        heading: "Medical Consultation Summary",
        description:
          "Following our consultation on February 28, 2024, I have diagnosed John Doe with hypertension and prescribed",
        prescription: "1 Prescription",
      },
      {
        heading: "Medical Consultation Summary",
        description:
          "Following our consultation on February 28, 2024, I have diagnosed John Doe with hypertension and prescribed",
        prescription: "1 Prescription",
      },

      {
        heading: "Medical Consultation Summary",
        description:
          "Following our consultation on February 28, 2024, I have diagnosed John Doe with hypertension and prescribed",
        prescription: "1 Prescription",
      },
      {
        heading: "Medical Consultation Summary",
        description:
          "Following our consultation on February 28, 2024, I have diagnosed John Doe with hypertension and prescribed",
        prescription: "1 Prescription",
      },
    ],
  };

  return (
    <DashboardLayout className="overflow-hidden">
      <div className="flex w-full">
        <div className="w-full lg:max-w-[378px] pb-14">
          <div className="bg-white pt-[42px] pb-[29px]">
            <div className="px-[22px]">
              <h3 className="section-heading">Patients</h3>
              <div className="flex items-center gap-2 p-[14px] rounded-[10px] bg-verylightgray w-full mt-[22px]">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="bg-white h-[calc(100vh-135px)] xl:h-[calc(100vh-235px)] overflow-y-auto custom-scrollbar mt-4 border border-t">
              <PatientsList
                patientsdatalist={filteredPatients}
                activePatient={activePatient}
                setActivePatient={setActivePatient}
              />
            </div>
          </div>
        </div>

        {currentPatient && (
          <div className="py-[42px] h-[calc(100vh-147px)] xl:h-[calc(100vh-70px)] overflow-y-auto px-[35px] bg-white w-full border border-l hidden lg:flex flex-col">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-x-3.5">
                <Image
                  className="rounded-full object-cover h-full w-full max-w-[87px] min-h-[80px] max-h-[87px]"
                  width={87}
                  height={87}
                  src={currentPatient.imageUrl}
                  alt={currentPatient.name}
                />
                <div>
                  <h3 className="text-xl font-poppins font-medium">
                    {currentPatient.name}
                  </h3>
                  <p className="text-shadesOn text-[15px] font-poppins">
                    {currentPatient.ailment} -{" "}
                    <span className="text-irongray">Latest diagnosis</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-x-3.5">
                <button className="bg-primary w-12 h-12 rounded-full grid place-content-center">
                  <Message />
                </button>
                <button className="bg-primary w-12 h-12 rounded-full grid place-content-center">
                  <VideoIcon />
                </button>
              </div>
            </div>

            {/* Wrap PatientInfoTabs in Suspense */}
            <Suspense fallback={<div>Loading...</div>}>
              <PatientInfoTabs
                buttonslist={buttonslist}
                patientsdetails={patientsdetails}
              />
            </Suspense>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PatientsInfo;
