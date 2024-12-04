import React from "react";

const PatientsGeneralInformation = ({ information }) => {
  return (
    <>
      <div className="w-full mt-11">
        <p className="text-lg font-medium  text-mainblack">
          General Information
        </p>
        <ul className="w-full divide-y divide-indigo-50">
          <li className="flex items-center justify-between py-[17px]">
            <span className="text-shadesOn text-sm  font-medium">
              Date of birth
            </span>
            <span className="text-mainblack text-sm  font-medium">
              {information.dob}
            </span>
          </li>
          <li className="flex items-center justify-between py-[17px]">
            <span className="text-shadesOn text-sm  font-medium">Age</span>
            <span className="text-mainblack text-sm  font-medium">
              {information.age}
            </span>
          </li>
          <li className="flex items-center justify-between py-[17px]">
            <span className="text-shadesOn text-sm  font-medium">Sex</span>
            <span className="text-mainblack text-sm  font-medium">
              {information.sex}
            </span>
          </li>
          <li className="flex items-center justify-between py-[17px]">
            <span className="text-shadesOn text-sm  font-medium">Height</span>
            <span className="text-mainblack text-sm  font-medium">
              {information.height}
            </span>
          </li>
          <li className="flex items-center justify-between py-[17px]">
            <span className="text-shadesOn text-sm  font-medium">Weight</span>
            <span className="text-mainblack text-sm  font-medium">
              {information.weight}
            </span>
          </li>
          <li className="flex items-center justify-between py-[17px]">
            <span className="text-shadesOn text-sm  font-medium">
              Nationality
            </span>
            <span className="text-mainblack text-sm  font-medium">
              {information.nationality}
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PatientsGeneralInformation;
