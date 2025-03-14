'use client';
import { postnote } from '@/components/common/Helper';
import ListHeading from '@/components/common/ListHeading';
import NotesCard from '@/components/dashboard/patients/notes/NotesCard';
import { NotesSectionSkeleton } from '@/components/common/SkeletonLoader';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const NotesSection = () => {
    const [notesLoading, setNotesLoading] = useState(true);

    // Get the main dashboard loading state from Redux
    const dashboardLoading = useSelector(
        (state) => state.patientDashboard.isLoading
    );

    useEffect(() => {
        // Notes can take longer to load than the main dashboard data
        // So we'll simulate extra loading time for notes
        if (!dashboardLoading) {
            // Once dashboard data is loaded, wait a bit more for notes
            const timer = setTimeout(() => setNotesLoading(false), 800);
            return () => clearTimeout(timer);
        }
    }, [dashboardLoading]);

    if (notesLoading) {
        return <NotesSectionSkeleton />;
    }

    return (
        <div className="bg-white rounded-xl mt-5 lg:mt-0">
            <div className="px-3 sm:px-0">
                <ListHeading
                    heading="Notes"
                    href={'/dashboard/patients/notes'}
                />
            </div>
            <hr className="border-superSilver"></hr>
            <div className="px-[19px] py-5 sm:pt-[15px] space-y-[15px] sm:h-[529px] sm:overflow-y-auto custom-scrollbar">
                {postnote.slice(0, 3).map((note, index) => (
                    <NotesCard
                        note={note}
                        key={index}
                        additionalclass="border border-superSilver"
                    />
                ))}
            </div>
        </div>
    );
};

export default NotesSection;
