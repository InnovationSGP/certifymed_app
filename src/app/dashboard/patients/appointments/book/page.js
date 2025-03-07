import DashboardLayout from '@/components/common/DashboardLayout';
import FindProvider from '@/components/dashboard/patients/appointments/book/page';
import { Suspense } from 'react';

export const metadata = {
    title: 'CertifyMed - Find Provider',
    description:
        'Discover the future of healthcare through  CertifyMed: top-tier medical care at your fingertips. No more waiting—access qualified professionals instantly from home.'
};

const Book = () => {
    return (
        <DashboardLayout className={'overflow-auto'}>
            <Suspense fallback={<div>Loading...</div>}>
                <FindProvider />
            </Suspense>
        </DashboardLayout>
    );
};

export default Book;
