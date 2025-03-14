import { useState, useEffect } from 'react';
import PatientListItem from './PatientListItem';
import { PatientsListSkeleton } from './SkeletonLoader';

const PatientsList = ({
    patientsdatalist = [],
    activePatient,
    setActivePatient
}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading state
        if (patientsdatalist.length > 0) {
            const timer = setTimeout(() => setLoading(false), 1000);
            return () => clearTimeout(timer);
        } else {
            setLoading(false);
        }
    }, [patientsdatalist]);

    if (loading) {
        return <PatientsListSkeleton />;
    }

    return (
        <>
            <ul className="divide-y divide-lightgray">
                {patientsdatalist.length > 0 ? (
                    patientsdatalist.map((patient, index) => (
                        <PatientListItem
                            patient={patient}
                            key={index}
                            isActive={activePatient === patient.name}
                            onClick={() => setActivePatient(patient.name)}
                        />
                    ))
                ) : (
                    <li className="py-4 text-center text-gray-500">
                        No patients found
                    </li>
                )}
            </ul>
        </>
    );
};

export default PatientsList;
