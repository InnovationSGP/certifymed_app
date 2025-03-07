import DashboardLayout from "@/components/common/DashboardLayout";
import UserProfile from "@/components/common/UserProfile";
import React from "react";
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "CertifyMed - Patient Profile",
  description:
    "Discover the future of healthcare through  CertifyMed: top-tier medical care at your fingertips. No more waiting—access qualified professionals instantly from home.",
};
export const dyanmic = 'force-dynamic';

const ProfilePage = () => {
  return (
    <>
      <DashboardLayout className="overflow-auto">
        <UserProfile />
      </DashboardLayout>
    </>
  );
};

export default ProfilePage;
