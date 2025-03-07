import React from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardNav from './DashboardNav';

const DashboardLayout = ({ children, className }) => {
    return (
        <>
            <main className="flex items-start w-full bg-whisper h-screen overflow-hidden">
                <DashboardSidebar />
                <div className="w-full">
                    <DashboardNav />
                    <div className={`max-h-[calc(100vh-72px)] ${className}`}>
                        {children}
                    </div>
                </div>
            </main>
        </>
    );
};

export default DashboardLayout;
