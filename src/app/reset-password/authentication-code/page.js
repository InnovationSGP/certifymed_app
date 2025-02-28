import CommonLayoutHoc from '@/components/common/CommonLayoutHoc';
import AuthenticationCode from '@/components/auth/AuthenticationCode';
import React, { Suspense } from 'react';

export const metadata = {
    title: ' CertifyMed - Authenticated code',
    description:
        'Discover the future of healthcare through  CertifyMed: top-tier medical care at your fingertips. No more waiting—access qualified professionals instantly from home.'
};

const AuthenticationCodePage = () => {
    return (
        <CommonLayoutHoc>
            <Suspense>
                <AuthenticationCode />
            </Suspense>
        </CommonLayoutHoc>
    );
};

export default AuthenticationCodePage;
