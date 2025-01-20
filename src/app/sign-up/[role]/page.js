import SignUp from "@/components/auth/SignUp";
import CommonLayoutHoc from "@/components/common/CommonLayoutHoc";
import React from "react";

export async function generateMetadata({ params }) {
    const { role } = params;

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const capitalizedRole = capitalizeFirstLetter(role);

    const metadataByRole = {
        title: `CertifyMed - ${capitalizedRole} Sign Up`,
        description:
            "Join CertifyMed as a certified healthcare professional. Expand your reach and offer top-tier medical care through our innovative platform.",
    };
    return metadataByRole;
}

const SignUpPage = ({ params }) => {
    const { role } = params;

    if (!['doctor', 'patient'].includes(role)) {
        return <h1>Invalid Role</h1>;
    }

    return (
        <>
            <CommonLayoutHoc>
                <SignUp role={role}/>
            </CommonLayoutHoc>
        </>
    );
};

export default SignUpPage;
