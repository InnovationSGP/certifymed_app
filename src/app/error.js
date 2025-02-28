'use client';

const error = ({ error }) => {
    return (
        <div className="p-3">
            <span className="text-red">{error.message}</span>
        </div>
    );
};

export default error;
