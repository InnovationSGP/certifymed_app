import PatientListItem from './PatientListItem';
import { PatientsListSkeleton } from '@/components/common/SkeletonLoader';
import { useSelector } from 'react-redux';

const PatientsList = ({
    patientsdatalist = [],
    activePatient,
    setActivePatient
}) => {
    // Get loading state from Redux
    const isLoading = useSelector(
        (state) => state.allConcernedPatients.isLoading
    );

    // Create a safe reference to patients array
    const validPatients = Array.isArray(patientsdatalist)
        ? patientsdatalist
        : [];

    if (isLoading) {
        return <PatientsListSkeleton />;
    }

    return (
        <>
            <ul className="divide-y divide-lightgray">
                {validPatients.length > 0 ? (
                    validPatients.map((patient, index) => (
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
