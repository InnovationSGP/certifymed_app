import React from "react";
import PatientListItem from "./PatientListItem";

const PatientsList = ({
  patientsdatalist,
  activePatient,
  setActivePatient,
}) => {
  return (
    <>
      <ul className="divide-y divide-lightgray">
        {patientsdatalist?.map((patient, index) => (
          <PatientListItem
            patient={patient}
            key={index}
            isActive={activePatient === patient.name}
            onClick={() => setActivePatient(patient.name)}
          />
        ))}
      </ul>
    </>
  );
};

export default PatientsList;
