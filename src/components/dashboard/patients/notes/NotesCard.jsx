import { RightArrow } from '@/components/common/AppIcons';
import { NotesCardSkeleton } from '@/components/common/SkeletonLoader';
import React from 'react';

const NotesCard = ({ note, additionalclass, loading }) => {
    if (loading) {
        return <NotesCardSkeleton />;
    }

    return (
        <>
            <article className={`notes-card ${additionalclass}`}>
                <h3 className="font-semibold mb-[11px]">{note.heading}</h3>
                <p className="mb-[27px] text-infinity ellipsis-3-lines">
                    {note.description}
                </p>
                <div className="w-full flex items-center justify-between">
                    <span className="text-flapper text-xs font-semibold">
                        {note.prescription}
                    </span>
                    <button>
                        <RightArrow />
                    </button>
                </div>
            </article>
        </>
    );
};

export default NotesCard;
