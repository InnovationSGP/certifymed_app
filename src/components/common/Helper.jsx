import {
    AddressIcon,
    FacebookIcon,
    InstagramIcon,
    LinkedinIcon,
    MailIcon,
    Telegram,
    TwitterIcon,
    YoutubeIcon
} from './Icons';
import {
    Appointments,
    Dashboard,
    DownloadIcon,
    Messages,
    Notes,
    NotificationsIcon,
    PatientsIcon,
    TestsResults
} from '@/components/common/AppIcons';

export const testimonials = [
    {
        quote: 'Absolutely brilliant telemedicine platform! Seamless consultations, and expert care.',
        name: 'Olamide Adedeji',
        role: 'Freelancer',
        image: '/images/user-1.png'
    },
    {
        quote: 'The platform has made my consultations so much easier and more convenient!',
        name: 'Sarah Ahmed',
        role: 'Designer',
        image: '/images/user-2.png'
    },
    {
        quote: 'Great experience with virtual consultations. Highly recommended!',
        name: 'James Adeyemi',
        role: 'Software Engineer',
        image: '/images/user-3.png'
    },
    {
        quote: 'Excellent service and top-notch professionals. The future of healthcare!',
        name: 'Victoria Osei',
        role: 'Business Analyst',
        image: '/images/user-4.png'
    }
];

export const sidebarlinksforpatients = [
    {
        name: 'Dashboard',
        icon: <Dashboard />,
        url: '/dashboard/patients'
    },
    {
        name: 'Appointments',
        icon: <Appointments />,
        url: '/dashboard/patients/appointments'
    },
    {
        name: 'Tests and Results',
        icon: <TestsResults />,
        url: '/dashboard/patients/tests-and-results'
    },
    {
        name: 'Notes',
        icon: <Notes />,
        url: '/dashboard/patients/notes'
    },
    {
        name: 'Messages',
        icon: <Messages />,
        url: '/video-call'
    }
];

export const sidebarlinksfordoctors = [
    {
        name: 'Dashboard',
        icon: <Dashboard />,
        url: '/dashboard/doctor'
    },
    {
        name: 'Patients',
        icon: <PatientsIcon />,
        url: '/dashboard/doctor/patients-info'
    },
    {
        name: 'Appointments',
        icon: <Appointments />,
        url: '/dashboard/doctor/appointments'
    },
    {
        name: 'Messages',
        icon: <Messages />,
        url: '/video-call'
    },
    {
        name: 'Notifications',
        icon: <NotificationsIcon />,
        url: '/video-call'
    }
];

export const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '#about', isOuter: false },
    { label: 'Contact', href: '#contact', isOuter: false },
    { label: 'How it works', href: '#how-it-works', isOuter: false },
    { label: 'Doctor', href: '/dashboard/doctor/', isOuter: true },
    { label: 'Patient', href: '/dashboard/patients/', isOuter: true }
];

export const footerLinks = [
    {
        title: 'Company',
        links: [
            { label: 'Home', href: '/' },
            { label: 'About', href: '#about' },
            { label: 'Contact', href: '#contact' },
            { label: 'How it works', href: '#how-it-works' }
        ]
    },
    {
        title: 'For Patients',
        links: [
            { label: 'Search for Doctors', href: '/' },
            { label: 'Log in', href: '/login' },
            { label: 'Sign up', href: '/sign-up' }
        ]
    },
    {
        title: 'For Doctors',
        links: [
            { label: 'Appointments', href: '/' },
            { label: 'Log in', href: '/login' },
            { label: 'Sign up', href: '/sign-up' }
        ]
    },
    {
        title: 'Company',
        links: [
            {
                label: 'info@ CertifyMed.com',
                href: 'mailto:info@ CertifyMed.com',
                icon: <MailIcon />
            },
            {
                label: '(234) 814 914 2336',
                href: 'tel:(234) 814 914 2336',
                icon: <Telegram />
            },
            {
                label: 'Company address',
                href: 'https://www.google.com/maps/place/Your+Company+Address',
                icon: <AddressIcon />
            }
        ]
    }
];

export const socialLinks = [
    { href: 'https://facebook.com', icon: <FacebookIcon /> },
    { href: 'https://twitter.com', icon: <TwitterIcon /> },
    { href: 'https://instagram.com', icon: <InstagramIcon /> },
    { href: 'https://linkedin.com', icon: <LinkedinIcon /> },
    { href: 'https://youtube.com', icon: <YoutubeIcon /> }
];

export const appointments = [
    {
        id: 'AP001',
        doctor: 'Dr. Adeleke David',
        date: '08 Jan 2024',
        mode: 'Online',
        status: 'Completed',
        imageUrl: '/images/user-image.png'
    },
    {
        id: 'AP002',
        doctor: 'Dr. Adeleke David',
        date: '08 Jan 2024',
        mode: 'Online',
        status: 'Completed',
        imageUrl: '/images/user-image.png'
    },
    {
        id: 'AP003',
        doctor: 'Dr. Adeleke David',
        date: '08 Jan 2024',
        mode: 'Online',
        status: 'Completed',
        imageUrl: '/images/user-image.png'
    },
    {
        id: 'AP004',
        doctor: 'Dr. Adeleke David',
        date: '08 Jan 2024',
        mode: 'Online',
        status: 'Completed',
        imageUrl: '/images/user-image.png'
    },
    {
        id: 'AP005',
        doctor: 'Dr. Adeleke David',
        date: '08 Jan 2024',
        mode: 'Online',
        status: 'Completed',
        imageUrl: '/images/user-image.png'
    },
    {
        id: 'AP006',
        doctor: 'Dr. Adeleke David',
        date: '08 Jan 2024',
        mode: 'Online',
        status: 'Completed',
        imageUrl: '/images/user-image.png'
    },
    {
        id: 'AP007',
        doctor: 'Dr. Adeleke David',
        date: '08 Jan 2024',
        mode: 'Online',
        status: 'Completed',
        imageUrl: '/images/user-image.png'
    },
    {
        id: 'AP008',
        doctor: 'Dr. Adeleke David',
        date: '08 Jan 2024',
        mode: 'Online',
        status: 'Completed',
        imageUrl: '/images/user-image.png'
    },
    {
        id: 'AP009',
        doctor: 'Dr. Adeleke David',
        date: '08 Jan 2024',
        mode: 'Online',
        status: 'Completed',
        imageUrl: '/images/user-image.png'
    },
    {
        id: 'AP0010',
        doctor: 'Dr. Adeleke David',
        date: '08 Jan 2024',
        mode: 'Online',
        status: 'Completed',
        imageUrl: '/images/user-image.png'
    }
];

export const patientappointments = [
    {
        id: 'AP001',
        doctor: 'Bukola Dav...',
        date: '08 Jan 2024',
        mode: 'Online',
        status: 'Completed',
        imageUrl: '/images/patient.png'
    },
    {
        id: 'AP002',
        doctor: 'Bukola Dav...',
        date: '08 Jan 2024',
        mode: 'Online',
        status: 'Completed',
        imageUrl: '/images/patient.png'
    },
    {
        id: 'AP003',
        doctor: 'Bukola Dav...',
        date: '08 Jan 2024',
        mode: 'Online',
        status: 'Completed',
        imageUrl: '/images/patient.png'
    },
    {
        id: 'AP004',
        doctor: 'Bukola Dav...',
        date: '08 Jan 2024',
        mode: 'Online',
        status: 'Completed',
        imageUrl: '/images/patient.png'
    },
    {
        id: 'AP005',
        doctor: 'Bukola Dav...',
        date: '08 Jan 2024',
        mode: 'Online',
        status: 'Completed',
        imageUrl: '/images/patient.png'
    },
    {
        id: 'AP006',
        doctor: 'Bukola Dav...',
        date: '08 Jan 2024',
        mode: 'Online',
        status: 'Completed',
        imageUrl: '/images/patient.png'
    },
    {
        id: 'AP007',
        doctor: 'Bukola Dav...',
        date: '08 Jan 2024',
        mode: 'Online',
        status: 'Completed',
        imageUrl: '/images/patient.png'
    },
    {
        id: 'AP008',
        doctor: 'Bukola Dav...',
        date: '08 Jan 2024',
        mode: 'Online',
        status: 'Completed',
        imageUrl: '/images/patient.png'
    },
    {
        id: 'AP009',
        doctor: 'Bukola Dav...',
        date: '08 Jan 2024',
        mode: 'Online',
        status: 'Completed',
        imageUrl: '/images/patient.png'
    },
    {
        id: 'AP0010',
        doctor: 'Bukola Dav...',
        date: '08 Jan 2024',
        mode: 'Online',
        status: 'Completed',
        imageUrl: '/images/patient.png'
    }
];

export const patients = [
    {
        name: 'Adeolu Jackson',
        ailment: 'Flu',
        imageUrl: '/images/Jackson.png'
    },
    {
        name: 'Bukola Davis',
        ailment: 'Malaria',
        imageUrl: '/images/Davis.png'
    },
    {
        name: 'Chinwe Mitchell',
        ailment: 'Typhoid',
        imageUrl: '/images/Mitchell.png'
    },
    {
        name: 'Ebuka Williams',
        ailment: 'Diabetes',
        imageUrl: '/images/Williams.png'
    },
    {
        name: 'Esther Phillips',
        ailment: 'Malaria',
        imageUrl: '/images/Phillips.png'
    },
    {
        name: 'Funmilayo Edwards',
        ailment: 'Fever',
        imageUrl: '/images/Edwards.png'
    },

    {
        name: 'Bukola Davis',
        ailment: 'Malaria',
        imageUrl: '/images/Davis.png'
    },
    {
        name: 'Chinwe Mitchell',
        ailment: 'Typhoid',
        imageUrl: '/images/Mitchell.png'
    },
    {
        name: 'Ebuka Williams',
        ailment: 'Diabetes',
        imageUrl: '/images/Williams.png'
    },
    {
        name: 'Funmilayo Edwards',
        ailment: 'Fever',
        imageUrl: '/images/Edwards.png'
    }
];

export const patientsdatalist = [
    {
        name: 'Adeolu Jackson',
        ailment: 'Flu',
        imageUrl: '/images/Jackson.png'
    },
    {
        name: 'Bukola Davis',
        ailment: 'Malaria',
        imageUrl: '/images/Davis.png'
    },
    {
        name: 'Chinwe Mitchell',
        ailment: 'Typhoid',
        imageUrl: '/images/Mitchell.png'
    },
    {
        name: 'Ebuka Williams',
        ailment: 'Diabetes',
        imageUrl: '/images/Williams.png'
    },
    {
        name: 'Esther Phillips',
        ailment: 'Malaria',
        imageUrl: '/images/Phillips.png'
    },
    {
        name: 'Funmilayo Edwards',
        ailment: 'Fever',
        imageUrl: '/images/Edwards.png'
    },
    {
        name: 'Grace Adams',
        ailment: 'Cold',
        imageUrl: '/images/Davis.png'
    },
    {
        name: 'Helen Peters',
        ailment: 'Cough',
        imageUrl: '/images/Mitchell.png'
    },
    {
        name: 'Isaac Brown',
        ailment: 'Hypertension',
        imageUrl: '/images/Williams.png'
    },
    {
        name: 'Jane Clark',
        ailment: 'Allergy',
        imageUrl: '/images/Edwards.png'
    }
];

export const patientsapoinmenthistory = [
    {
        id: 'AP001',
        date: '08 Jan 2024',
        mode: 'Online',
        status: 'Completed'
    },
    {
        id: 'AP001',
        date: '08 Jan 2024',
        mode: 'Online',
        status: 'Completed'
    },
    {
        id: 'AP001',
        date: '08 Jan 2024',
        mode: 'Online',
        status: 'Completed'
    },
    {
        id: 'AP001',
        date: '08 Jan 2024',
        mode: 'Online',
        status: 'Completed'
    },
    {
        id: 'AP001',
        date: '08 Jan 2024',
        mode: 'Online',
        status: 'Completed'
    }
];

export const upcomingappointment = [
    {
        id: 'AP001',
        date: '11 Mar 2024',
        mode: 'Online',
        status: 'Pending'
    }
];

export const testsandresults = [
    {
        date: '08 Jan 2024',
        testfor: 'Malaria',
        conductedat: 'Gilmore Labs',
        result: 'Negative',
        action: <DownloadIcon />
    },
    {
        date: '08 Jan 2024',
        testfor: 'Malaria',
        conductedat: 'Gilmore Labs',
        result: 'Negative',
        action: <DownloadIcon />
    },
    {
        date: '08 Jan 2024',
        testfor: 'Malaria',
        conductedat: 'Gilmore Labs',
        result: 'Negative',
        action: <DownloadIcon />
    },
    {
        date: '08 Jan 2024',
        testfor: 'Malaria',
        conductedat: 'Gilmore Labs',
        result: 'Negative',
        action: <DownloadIcon />
    },
    {
        date: '08 Jan 2024',
        testfor: 'Malaria',
        conductedat: 'Gilmore Labs',
        result: 'Negative',
        action: <DownloadIcon />
    },
    {
        date: '08 Jan 2024',
        testfor: 'Malaria',
        conductedat: 'Gilmore Labs',
        result: 'Negative',
        action: <DownloadIcon />
    },
    {
        date: '08 Jan 2024',
        testfor: 'Malaria',
        conductedat: 'Gilmore Labs',
        result: 'Negative',
        action: <DownloadIcon />
    },
    {
        date: '08 Jan 2024',
        testfor: 'Malaria',
        conductedat: 'Gilmore Labs',
        result: 'Negative',
        action: <DownloadIcon />
    }
];

export const postnote = [
    {
        heading: 'Medical Consultation Summary',
        description:
            'Following our consultation on February 28, 2024, I have diagnosed John Doe with hypertension and prescribed',
        prescription: '1 Prescription'
    },
    {
        heading: 'Medical Consultation Summary',
        description:
            'Following our consultation on February 28, 2024, I have diagnosed John Doe with hypertension and prescribed',
        prescription: '1 Prescription'
    },
    {
        heading: 'Medical Consultation Summary',
        description:
            'Following our consultation on February 28, 2024, I have diagnosed John Doe with hypertension and prescribed',
        prescription: '1 Prescription'
    },
    {
        heading: 'Medical Consultation Summary',
        description:
            'Following our consultation on February 28, 2024, I have diagnosed John Doe with hypertension and prescribed',
        prescription: '1 Prescription'
    },

    {
        heading: 'Medical Consultation Summary',
        description:
            'Following our consultation on February 28, 2024, I have diagnosed John Doe with hypertension and prescribed',
        prescription: '1 Prescription'
    },
    {
        heading: 'Medical Consultation Summary',
        description:
            'Following our consultation on February 28, 2024, I have diagnosed John Doe with hypertension and prescribed',
        prescription: '1 Prescription'
    }
];

export const profileData = {
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBvcnRyYWl0JTIwbWFufGVufDB8fDB8fHww',
    userName: 'Bhupinder Singh FNK-BN',
    timings: sessionStorage.getItem('timing') || 'No Timings Available',
    appointmentType: sessionStorage.getItem('appointmentData')
        ? sessionStorage.getItem('appointmentData').split(',')[0]
        : 'N/A',
    appointmentName: sessionStorage.getItem('appointmentData')
        ? sessionStorage.getItem('appointmentData').split(',')[1]
        : 'N/A',
    appointmentDesc: sessionStorage.getItem('appointmentData')
        ? sessionStorage.getItem('appointmentData').split(',')[2]
        : 'N/A',
    selectedDate: sessionStorage.getItem('selectedDate'),
    appointmentDuration: 30,
    desc: 'Acute Care',
    exp: '13 years of experience',
    rating: 4.96,
    totalRating: 1758,
    moreDesc:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores pariatur mollitia voluptas nesciunt? Non deleniti totam enim magnam pariatur officiis animi, quaerat, ea doloremque a placeat. Ratione, perferendis? Aut explicabo delectus quo officia molestias doloremque laboriosam, fugit consectetur rem voluptates velit ut facere minus non sit nemo. Blanditiis nesciunt modi pariatur, vero alias reiciendis numquam reprehenderit est commodi. Ipsa illo rerum eius aspernatur deleniti, veniam quas quisquam harum voluptatibus aliquid et ullam, dicta ad quaerat laudantium quam magnam corporis quae laborum nesciunt eaque, ducimus fuga? Quaerat ut blanditiis harum laborum animi tempora veritatis saepe quae qui, aut corporis tempore. Deleniti maxime, autem.'
};

export const appointmentsDrop = [
    {
        id: 1,
        title: 'Annual GYN Exam',
        description:
            'Discuss reproductive and sexual health and receive a breast exam, pelvic exam and pap smear'
    },
    {
        id: 2,
        title: 'Annual GYN Exam',
        description:
            'Discuss reproductive and sexual health and receive a breast exam, pelvic exam and pap smear'
    },
    {
        id: 3,
        title: 'Annual GYN Exam',
        description:
            'Discuss reproductive and sexual health and receive a breast exam, pelvic exam and pap smear'
    },
    {
        id: 4,
        title: 'Annual GYN Exam',
        description:
            'Discuss reproductive and sexual health and receive a breast exam, pelvic exam and pap smear'
    },
    {
        id: 5,
        title: 'Annual GYN Exam',
        description:
            'Discuss reproductive and sexual health and receive a breast exam, pelvic exam and pap smear'
    },
    {
        id: 6,
        title: 'Annual GYN Exam',
        description:
            'Discuss reproductive and sexual health and receive a breast exam, pelvic exam and pap smear'
    }
];

export const TimingProviders = [
    {
        shift: 'Morning',
        data: [
            { time: '8:30 am', count: 4 },
            { time: '9:30 am', count: 2 },
            { time: '10:30 am', count: 1 },
            { time: '11:30 am', count: 5 },
            { time: '12:00 pm', count: 8 }
        ]
    },
    {
        shift: 'Afternoon',
        data: [
            { time: '12:30 pm', count: 2 },
            { time: '01:30 pm', count: 3 },
            { time: '02:30 pm', count: 5 },
            { time: '03:30 pm', count: 1 },
            { time: '04:30 pm', count: 6 }
        ]
    },
    {
        shift: 'Evening',
        data: [
            { time: '06:30 pm', count: 2 },
            { time: '07:30 pm', count: 4 },
            { time: '08:30 pm', count: 5 },
            { time: '09:30 pm', count: 9 },
            { time: '10:30 pm', count: 4 },
            { time: '11:30 pm', count: 1 }
        ]
    }
];

export const insuranceProviders = [
    {
        name: 'Aetna',
        logo: 'https://s3-alpha-sig.figma.com/img/c3a1/3bb9/d2950a7defad59da60ac6aa68b7a6673?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SsuENc~91pG54dk7WzF2g7FH~HMn9SDRjdLY5kBxb7j-1qViiKxqwUfdNpnt76lYo3CDMypbcSYEQcHzGqLgmTRpamv6pwP4rSeQfjoBImpiNY23KDPoK2W3dnCyF6oqblJJVBw9mW0FQ82jgpWdBbQ2T~GhIPLaPt6Z6cZWIw24YZojpSBfDmDiFAazfUcRTpiOWeOQYSOxYbyZX2-TsAUX~c~GRgfAHgrTjVm2-0CGKGfkQjTaesNro5sqKz2VmSgeTX8~bbD5~S8xU-wC~LJXWPLsQxKtcqXxfJwKH8Ttwrt48BZ-RLEIB6qsv9IYQh9sE5dbxoI060IeAkSRdA__'
    },
    {
        name: 'Anthem',
        logo: 'https://s3-alpha-sig.figma.com/img/1c4b/c358/d3e4616fa265bdb8a19e3a7dd8cc09b9?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dA9LkIEJSbRFNJ5Ptk6xijsotVroyzavdcZO5FaTeZdNrip7iV-Oz3NqsNI-UrhFhCm~l5lbN8iLas-71nVMb28lwPOkHu1vmijafsBaT9RblMRnhEVSfnBZL9LKTj7MPlkzVetCLVr5iTpOrS5bha0NpaDyCovCmRxyPDYfNw-FcJB2zhhMS7urjpcOiXqrXU8MzLvAznSF6wm3ewuhNQmGPPiKY5ItJC5VBCtB3kR6RBQ1RoYy1VSAPqw2~M1xqbMBhDGinPlmy4N6apik1dYT1o7HchsH0zBn~g1ZTL14lAGCddm3XjqmbKrGnl-YW2PItNQsFlSIXQFGafqpNw__'
    },
    {
        name: 'Aetna',
        logo: 'https://s3-alpha-sig.figma.com/img/c3a1/3bb9/d2950a7defad59da60ac6aa68b7a6673?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SsuENc~91pG54dk7WzF2g7FH~HMn9SDRjdLY5kBxb7j-1qViiKxqwUfdNpnt76lYo3CDMypbcSYEQcHzGqLgmTRpamv6pwP4rSeQfjoBImpiNY23KDPoK2W3dnCyF6oqblJJVBw9mW0FQ82jgpWdBbQ2T~GhIPLaPt6Z6cZWIw24YZojpSBfDmDiFAazfUcRTpiOWeOQYSOxYbyZX2-TsAUX~c~GRgfAHgrTjVm2-0CGKGfkQjTaesNro5sqKz2VmSgeTX8~bbD5~S8xU-wC~LJXWPLsQxKtcqXxfJwKH8Ttwrt48BZ-RLEIB6qsv9IYQh9sE5dbxoI060IeAkSRdA__'
    },
    {
        name: 'Anthem',
        logo: 'https://s3-alpha-sig.figma.com/img/1c4b/c358/d3e4616fa265bdb8a19e3a7dd8cc09b9?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dA9LkIEJSbRFNJ5Ptk6xijsotVroyzavdcZO5FaTeZdNrip7iV-Oz3NqsNI-UrhFhCm~l5lbN8iLas-71nVMb28lwPOkHu1vmijafsBaT9RblMRnhEVSfnBZL9LKTj7MPlkzVetCLVr5iTpOrS5bha0NpaDyCovCmRxyPDYfNw-FcJB2zhhMS7urjpcOiXqrXU8MzLvAznSF6wm3ewuhNQmGPPiKY5ItJC5VBCtB3kR6RBQ1RoYy1VSAPqw2~M1xqbMBhDGinPlmy4N6apik1dYT1o7HchsH0zBn~g1ZTL14lAGCddm3XjqmbKrGnl-YW2PItNQsFlSIXQFGafqpNw__'
    },
    {
        name: 'Aetna',
        logo: 'https://s3-alpha-sig.figma.com/img/c3a1/3bb9/d2950a7defad59da60ac6aa68b7a6673?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SsuENc~91pG54dk7WzF2g7FH~HMn9SDRjdLY5kBxb7j-1qViiKxqwUfdNpnt76lYo3CDMypbcSYEQcHzGqLgmTRpamv6pwP4rSeQfjoBImpiNY23KDPoK2W3dnCyF6oqblJJVBw9mW0FQ82jgpWdBbQ2T~GhIPLaPt6Z6cZWIw24YZojpSBfDmDiFAazfUcRTpiOWeOQYSOxYbyZX2-TsAUX~c~GRgfAHgrTjVm2-0CGKGfkQjTaesNro5sqKz2VmSgeTX8~bbD5~S8xU-wC~LJXWPLsQxKtcqXxfJwKH8Ttwrt48BZ-RLEIB6qsv9IYQh9sE5dbxoI060IeAkSRdA__'
    },
    {
        name: 'Anthem',
        logo: 'https://s3-alpha-sig.figma.com/img/1c4b/c358/d3e4616fa265bdb8a19e3a7dd8cc09b9?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dA9LkIEJSbRFNJ5Ptk6xijsotVroyzavdcZO5FaTeZdNrip7iV-Oz3NqsNI-UrhFhCm~l5lbN8iLas-71nVMb28lwPOkHu1vmijafsBaT9RblMRnhEVSfnBZL9LKTj7MPlkzVetCLVr5iTpOrS5bha0NpaDyCovCmRxyPDYfNw-FcJB2zhhMS7urjpcOiXqrXU8MzLvAznSF6wm3ewuhNQmGPPiKY5ItJC5VBCtB3kR6RBQ1RoYy1VSAPqw2~M1xqbMBhDGinPlmy4N6apik1dYT1o7HchsH0zBn~g1ZTL14lAGCddm3XjqmbKrGnl-YW2PItNQsFlSIXQFGafqpNw__'
    },
    {
        name: 'Aetna',
        logo: 'https://s3-alpha-sig.figma.com/img/c3a1/3bb9/d2950a7defad59da60ac6aa68b7a6673?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SsuENc~91pG54dk7WzF2g7FH~HMn9SDRjdLY5kBxb7j-1qViiKxqwUfdNpnt76lYo3CDMypbcSYEQcHzGqLgmTRpamv6pwP4rSeQfjoBImpiNY23KDPoK2W3dnCyF6oqblJJVBw9mW0FQ82jgpWdBbQ2T~GhIPLaPt6Z6cZWIw24YZojpSBfDmDiFAazfUcRTpiOWeOQYSOxYbyZX2-TsAUX~c~GRgfAHgrTjVm2-0CGKGfkQjTaesNro5sqKz2VmSgeTX8~bbD5~S8xU-wC~LJXWPLsQxKtcqXxfJwKH8Ttwrt48BZ-RLEIB6qsv9IYQh9sE5dbxoI060IeAkSRdA__'
    },
    {
        name: 'Anthem',
        logo: 'https://s3-alpha-sig.figma.com/img/1c4b/c358/d3e4616fa265bdb8a19e3a7dd8cc09b9?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dA9LkIEJSbRFNJ5Ptk6xijsotVroyzavdcZO5FaTeZdNrip7iV-Oz3NqsNI-UrhFhCm~l5lbN8iLas-71nVMb28lwPOkHu1vmijafsBaT9RblMRnhEVSfnBZL9LKTj7MPlkzVetCLVr5iTpOrS5bha0NpaDyCovCmRxyPDYfNw-FcJB2zhhMS7urjpcOiXqrXU8MzLvAznSF6wm3ewuhNQmGPPiKY5ItJC5VBCtB3kR6RBQ1RoYy1VSAPqw2~M1xqbMBhDGinPlmy4N6apik1dYT1o7HchsH0zBn~g1ZTL14lAGCddm3XjqmbKrGnl-YW2PItNQsFlSIXQFGafqpNw__'
    },
    {
        name: 'Aetna',
        logo: 'https://s3-alpha-sig.figma.com/img/c3a1/3bb9/d2950a7defad59da60ac6aa68b7a6673?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SsuENc~91pG54dk7WzF2g7FH~HMn9SDRjdLY5kBxb7j-1qViiKxqwUfdNpnt76lYo3CDMypbcSYEQcHzGqLgmTRpamv6pwP4rSeQfjoBImpiNY23KDPoK2W3dnCyF6oqblJJVBw9mW0FQ82jgpWdBbQ2T~GhIPLaPt6Z6cZWIw24YZojpSBfDmDiFAazfUcRTpiOWeOQYSOxYbyZX2-TsAUX~c~GRgfAHgrTjVm2-0CGKGfkQjTaesNro5sqKz2VmSgeTX8~bbD5~S8xU-wC~LJXWPLsQxKtcqXxfJwKH8Ttwrt48BZ-RLEIB6qsv9IYQh9sE5dbxoI060IeAkSRdA__'
    },
    {
        name: 'Anthem',
        logo: 'https://s3-alpha-sig.figma.com/img/1c4b/c358/d3e4616fa265bdb8a19e3a7dd8cc09b9?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dA9LkIEJSbRFNJ5Ptk6xijsotVroyzavdcZO5FaTeZdNrip7iV-Oz3NqsNI-UrhFhCm~l5lbN8iLas-71nVMb28lwPOkHu1vmijafsBaT9RblMRnhEVSfnBZL9LKTj7MPlkzVetCLVr5iTpOrS5bha0NpaDyCovCmRxyPDYfNw-FcJB2zhhMS7urjpcOiXqrXU8MzLvAznSF6wm3ewuhNQmGPPiKY5ItJC5VBCtB3kR6RBQ1RoYy1VSAPqw2~M1xqbMBhDGinPlmy4N6apik1dYT1o7HchsH0zBn~g1ZTL14lAGCddm3XjqmbKrGnl-YW2PItNQsFlSIXQFGafqpNw__'
    },
    {
        name: 'Aetna',
        logo: 'https://s3-alpha-sig.figma.com/img/c3a1/3bb9/d2950a7defad59da60ac6aa68b7a6673?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SsuENc~91pG54dk7WzF2g7FH~HMn9SDRjdLY5kBxb7j-1qViiKxqwUfdNpnt76lYo3CDMypbcSYEQcHzGqLgmTRpamv6pwP4rSeQfjoBImpiNY23KDPoK2W3dnCyF6oqblJJVBw9mW0FQ82jgpWdBbQ2T~GhIPLaPt6Z6cZWIw24YZojpSBfDmDiFAazfUcRTpiOWeOQYSOxYbyZX2-TsAUX~c~GRgfAHgrTjVm2-0CGKGfkQjTaesNro5sqKz2VmSgeTX8~bbD5~S8xU-wC~LJXWPLsQxKtcqXxfJwKH8Ttwrt48BZ-RLEIB6qsv9IYQh9sE5dbxoI060IeAkSRdA__'
    },
    {
        name: 'Anthem',
        logo: 'https://s3-alpha-sig.figma.com/img/1c4b/c358/d3e4616fa265bdb8a19e3a7dd8cc09b9?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dA9LkIEJSbRFNJ5Ptk6xijsotVroyzavdcZO5FaTeZdNrip7iV-Oz3NqsNI-UrhFhCm~l5lbN8iLas-71nVMb28lwPOkHu1vmijafsBaT9RblMRnhEVSfnBZL9LKTj7MPlkzVetCLVr5iTpOrS5bha0NpaDyCovCmRxyPDYfNw-FcJB2zhhMS7urjpcOiXqrXU8MzLvAznSF6wm3ewuhNQmGPPiKY5ItJC5VBCtB3kR6RBQ1RoYy1VSAPqw2~M1xqbMBhDGinPlmy4N6apik1dYT1o7HchsH0zBn~g1ZTL14lAGCddm3XjqmbKrGnl-YW2PItNQsFlSIXQFGafqpNw__'
    },
    {
        name: 'Aetna',
        logo: 'https://s3-alpha-sig.figma.com/img/c3a1/3bb9/d2950a7defad59da60ac6aa68b7a6673?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SsuENc~91pG54dk7WzF2g7FH~HMn9SDRjdLY5kBxb7j-1qViiKxqwUfdNpnt76lYo3CDMypbcSYEQcHzGqLgmTRpamv6pwP4rSeQfjoBImpiNY23KDPoK2W3dnCyF6oqblJJVBw9mW0FQ82jgpWdBbQ2T~GhIPLaPt6Z6cZWIw24YZojpSBfDmDiFAazfUcRTpiOWeOQYSOxYbyZX2-TsAUX~c~GRgfAHgrTjVm2-0CGKGfkQjTaesNro5sqKz2VmSgeTX8~bbD5~S8xU-wC~LJXWPLsQxKtcqXxfJwKH8Ttwrt48BZ-RLEIB6qsv9IYQh9sE5dbxoI060IeAkSRdA__'
    },
    {
        name: 'Anthem',
        logo: 'https://s3-alpha-sig.figma.com/img/1c4b/c358/d3e4616fa265bdb8a19e3a7dd8cc09b9?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dA9LkIEJSbRFNJ5Ptk6xijsotVroyzavdcZO5FaTeZdNrip7iV-Oz3NqsNI-UrhFhCm~l5lbN8iLas-71nVMb28lwPOkHu1vmijafsBaT9RblMRnhEVSfnBZL9LKTj7MPlkzVetCLVr5iTpOrS5bha0NpaDyCovCmRxyPDYfNw-FcJB2zhhMS7urjpcOiXqrXU8MzLvAznSF6wm3ewuhNQmGPPiKY5ItJC5VBCtB3kR6RBQ1RoYy1VSAPqw2~M1xqbMBhDGinPlmy4N6apik1dYT1o7HchsH0zBn~g1ZTL14lAGCddm3XjqmbKrGnl-YW2PItNQsFlSIXQFGafqpNw__'
    },
    {
        name: 'Aetna',
        logo: 'https://s3-alpha-sig.figma.com/img/c3a1/3bb9/d2950a7defad59da60ac6aa68b7a6673?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SsuENc~91pG54dk7WzF2g7FH~HMn9SDRjdLY5kBxb7j-1qViiKxqwUfdNpnt76lYo3CDMypbcSYEQcHzGqLgmTRpamv6pwP4rSeQfjoBImpiNY23KDPoK2W3dnCyF6oqblJJVBw9mW0FQ82jgpWdBbQ2T~GhIPLaPt6Z6cZWIw24YZojpSBfDmDiFAazfUcRTpiOWeOQYSOxYbyZX2-TsAUX~c~GRgfAHgrTjVm2-0CGKGfkQjTaesNro5sqKz2VmSgeTX8~bbD5~S8xU-wC~LJXWPLsQxKtcqXxfJwKH8Ttwrt48BZ-RLEIB6qsv9IYQh9sE5dbxoI060IeAkSRdA__'
    },
    {
        name: 'Anthem',
        logo: 'https://s3-alpha-sig.figma.com/img/1c4b/c358/d3e4616fa265bdb8a19e3a7dd8cc09b9?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dA9LkIEJSbRFNJ5Ptk6xijsotVroyzavdcZO5FaTeZdNrip7iV-Oz3NqsNI-UrhFhCm~l5lbN8iLas-71nVMb28lwPOkHu1vmijafsBaT9RblMRnhEVSfnBZL9LKTj7MPlkzVetCLVr5iTpOrS5bha0NpaDyCovCmRxyPDYfNw-FcJB2zhhMS7urjpcOiXqrXU8MzLvAznSF6wm3ewuhNQmGPPiKY5ItJC5VBCtB3kR6RBQ1RoYy1VSAPqw2~M1xqbMBhDGinPlmy4N6apik1dYT1o7HchsH0zBn~g1ZTL14lAGCddm3XjqmbKrGnl-YW2PItNQsFlSIXQFGafqpNw__'
    }
];
