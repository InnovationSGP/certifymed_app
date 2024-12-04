import {
  AddressIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  Telegram,
  TwitterIcon,
  YoutubeIcon,
} from "./Icons";
import {
  Appointments,
  Dashboard,
  DownloadIcon,
  Messages,
  Notes,
  NotificationsIcon,
  PatientsIcon,
  TestsResults,
} from "@/components/common/AppIcons";

export const testimonials = [
  {
    quote:
      "Absolutely brilliant telemedicine platform! Seamless consultations, and expert care.",
    name: "Olamide Adedeji",
    role: "Freelancer",
    image: "/images/user-1.png",
  },
  {
    quote:
      "The platform has made my consultations so much easier and more convenient!",
    name: "Sarah Ahmed",
    role: "Designer",
    image: "/images/user-2.png",
  },
  {
    quote: "Great experience with virtual consultations. Highly recommended!",
    name: "James Adeyemi",
    role: "Software Engineer",
    image: "/images/user-3.png",
  },
  {
    quote:
      "Excellent service and top-notch professionals. The future of healthcare!",
    name: "Victoria Osei",
    role: "Business Analyst",
    image: "/images/user-4.png",
  },
];

export const sidebarlinksforpatients = [
  {
    name: "Dashboard",
    icon: <Dashboard />,
    url: "/dashboard/patients",
  },
  {
    name: "Appointments",
    icon: <Appointments />,
    url: "/dashboard/patients/appointments",
  },
  {
    name: "Tests and Results",
    icon: <TestsResults />,
    url: "/dashboard/patients/tests-and-results",
  },
  {
    name: "Notes",
    icon: <Notes />,
    url: "/dashboard/patients/notes",
  },
  {
    name: "Messages",
    icon: <Messages />,
    url: "/video-call",
  },
];

export const sidebarlinksfordoctors = [
  {
    name: "Dashboard",
    icon: <Dashboard />,
    url: "/dashboard/doctor",
  },
  {
    name: "Patients",
    icon: <PatientsIcon />,
    url: "/dashboard/doctor/patients-info",
  },
  {
    name: "Appointments",
    icon: <Appointments />,
    url: "/dashboard/doctor/appointments",
  },
  {
    name: "Messages",
    icon: <Messages />,
    url: "/video-call",
  },
  {
    name: "Notifications",
    icon: <NotificationsIcon />,
    url: "/video-call",
  },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about", isOuter: false },
  { label: "Contact", href: "#contact", isOuter: false },
  { label: "How it works", href: "#how-it-works", isOuter: false },
  { label: "Doctor", href: "/dashboard/doctor/", isOuter: true },
  { label: "Patient", href: "/dashboard/patients/", isOuter: true },
];

export const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
      { label: "How it works", href: "#how-it-works" },
    ],
  },
  {
    title: "For Patients",
    links: [
      { label: "Search for Doctors", href: "/" },
      { label: "Log in", href: "/login" },
      { label: "Sign up", href: "/sign-up" },
    ],
  },
  {
    title: "For Doctors",
    links: [
      { label: "Appointments", href: "/" },
      { label: "Log in", href: "/login" },
      { label: "Sign up", href: "/sign-up" },
    ],
  },
  {
    title: "Company",
    links: [
      {
        label: "info@ CertifyMed.com",
        href: "mailto:info@ CertifyMed.com",
        icon: <MailIcon />,
      },
      {
        label: "(234) 814 914 2336",
        href: "tel:(234) 814 914 2336",
        icon: <Telegram />,
      },
      {
        label: "Company address",
        href: "https://www.google.com/maps/place/Your+Company+Address",
        icon: <AddressIcon />,
      },
    ],
  },
];

export const socialLinks = [
  { href: "https://facebook.com", icon: <FacebookIcon /> },
  { href: "https://twitter.com", icon: <TwitterIcon /> },
  { href: "https://instagram.com", icon: <InstagramIcon /> },
  { href: "https://linkedin.com", icon: <LinkedinIcon /> },
  { href: "https://youtube.com", icon: <YoutubeIcon /> },
];

export const appointments = [
  {
    id: "AP001",
    doctor: "Dr. Adeleke David",
    date: "08 Jan 2024",
    mode: "Online",
    status: "Completed",
    imageUrl: "/images/user-image.png",
  },
  {
    id: "AP002",
    doctor: "Dr. Adeleke David",
    date: "08 Jan 2024",
    mode: "Online",
    status: "Completed",
    imageUrl: "/images/user-image.png",
  },
  {
    id: "AP003",
    doctor: "Dr. Adeleke David",
    date: "08 Jan 2024",
    mode: "Online",
    status: "Completed",
    imageUrl: "/images/user-image.png",
  },
  {
    id: "AP004",
    doctor: "Dr. Adeleke David",
    date: "08 Jan 2024",
    mode: "Online",
    status: "Completed",
    imageUrl: "/images/user-image.png",
  },
  {
    id: "AP005",
    doctor: "Dr. Adeleke David",
    date: "08 Jan 2024",
    mode: "Online",
    status: "Completed",
    imageUrl: "/images/user-image.png",
  },
  {
    id: "AP006",
    doctor: "Dr. Adeleke David",
    date: "08 Jan 2024",
    mode: "Online",
    status: "Completed",
    imageUrl: "/images/user-image.png",
  },
  {
    id: "AP007",
    doctor: "Dr. Adeleke David",
    date: "08 Jan 2024",
    mode: "Online",
    status: "Completed",
    imageUrl: "/images/user-image.png",
  },
  {
    id: "AP008",
    doctor: "Dr. Adeleke David",
    date: "08 Jan 2024",
    mode: "Online",
    status: "Completed",
    imageUrl: "/images/user-image.png",
  },
  {
    id: "AP009",
    doctor: "Dr. Adeleke David",
    date: "08 Jan 2024",
    mode: "Online",
    status: "Completed",
    imageUrl: "/images/user-image.png",
  },
  {
    id: "AP0010",
    doctor: "Dr. Adeleke David",
    date: "08 Jan 2024",
    mode: "Online",
    status: "Completed",
    imageUrl: "/images/user-image.png",
  },
];

export const patientappointments = [
  {
    id: "AP001",
    doctor: "Bukola Dav...",
    date: "08 Jan 2024",
    mode: "Online",
    status: "Completed",
    imageUrl: "/images/patient.png",
  },
  {
    id: "AP002",
    doctor: "Bukola Dav...",
    date: "08 Jan 2024",
    mode: "Online",
    status: "Completed",
    imageUrl: "/images/patient.png",
  },
  {
    id: "AP003",
    doctor: "Bukola Dav...",
    date: "08 Jan 2024",
    mode: "Online",
    status: "Completed",
    imageUrl: "/images/patient.png",
  },
  {
    id: "AP004",
    doctor: "Bukola Dav...",
    date: "08 Jan 2024",
    mode: "Online",
    status: "Completed",
    imageUrl: "/images/patient.png",
  },
  {
    id: "AP005",
    doctor: "Bukola Dav...",
    date: "08 Jan 2024",
    mode: "Online",
    status: "Completed",
    imageUrl: "/images/patient.png",
  },
  {
    id: "AP006",
    doctor: "Bukola Dav...",
    date: "08 Jan 2024",
    mode: "Online",
    status: "Completed",
    imageUrl: "/images/patient.png",
  },
  {
    id: "AP007",
    doctor: "Bukola Dav...",
    date: "08 Jan 2024",
    mode: "Online",
    status: "Completed",
    imageUrl: "/images/patient.png",
  },
  {
    id: "AP008",
    doctor: "Bukola Dav...",
    date: "08 Jan 2024",
    mode: "Online",
    status: "Completed",
    imageUrl: "/images/patient.png",
  },
  {
    id: "AP009",
    doctor: "Bukola Dav...",
    date: "08 Jan 2024",
    mode: "Online",
    status: "Completed",
    imageUrl: "/images/patient.png",
  },
  {
    id: "AP0010",
    doctor: "Bukola Dav...",
    date: "08 Jan 2024",
    mode: "Online",
    status: "Completed",
    imageUrl: "/images/patient.png",
  },
];

export const patients = [
  {
    name: "Adeolu Jackson",
    ailment: "Flu",
    imageUrl: "/images/Jackson.png",
  },
  {
    name: "Bukola Davis",
    ailment: "Malaria",
    imageUrl: "/images/Davis.png",
  },
  {
    name: "Chinwe Mitchell",
    ailment: "Typhoid",
    imageUrl: "/images/Mitchell.png",
  },
  {
    name: "Ebuka Williams",
    ailment: "Diabetes",
    imageUrl: "/images/Williams.png",
  },
  {
    name: "Esther Phillips",
    ailment: "Malaria",
    imageUrl: "/images/Phillips.png",
  },
  {
    name: "Funmilayo Edwards",
    ailment: "Fever",
    imageUrl: "/images/Edwards.png",
  },

  {
    name: "Bukola Davis",
    ailment: "Malaria",
    imageUrl: "/images/Davis.png",
  },
  {
    name: "Chinwe Mitchell",
    ailment: "Typhoid",
    imageUrl: "/images/Mitchell.png",
  },
  {
    name: "Ebuka Williams",
    ailment: "Diabetes",
    imageUrl: "/images/Williams.png",
  },
  {
    name: "Funmilayo Edwards",
    ailment: "Fever",
    imageUrl: "/images/Edwards.png",
  },
];

export const patientsdatalist = [
  {
    name: "Adeolu Jackson",
    ailment: "Flu",
    imageUrl: "/images/Jackson.png",
  },
  {
    name: "Bukola Davis",
    ailment: "Malaria",
    imageUrl: "/images/Davis.png",
  },
  {
    name: "Chinwe Mitchell",
    ailment: "Typhoid",
    imageUrl: "/images/Mitchell.png",
  },
  {
    name: "Ebuka Williams",
    ailment: "Diabetes",
    imageUrl: "/images/Williams.png",
  },
  {
    name: "Esther Phillips",
    ailment: "Malaria",
    imageUrl: "/images/Phillips.png",
  },
  {
    name: "Funmilayo Edwards",
    ailment: "Fever",
    imageUrl: "/images/Edwards.png",
  },
  {
    name: "Grace Adams",
    ailment: "Cold",
    imageUrl: "/images/Davis.png",
  },
  {
    name: "Helen Peters",
    ailment: "Cough",
    imageUrl: "/images/Mitchell.png",
  },
  {
    name: "Isaac Brown",
    ailment: "Hypertension",
    imageUrl: "/images/Williams.png",
  },
  {
    name: "Jane Clark",
    ailment: "Allergy",
    imageUrl: "/images/Edwards.png",
  },
];

export const patientsapoinmenthistory = [
  {
    id: "AP001",
    date: "08 Jan 2024",
    mode: "Online",
    status: "Completed",
  },
  {
    id: "AP001",
    date: "08 Jan 2024",
    mode: "Online",
    status: "Completed",
  },
  {
    id: "AP001",
    date: "08 Jan 2024",
    mode: "Online",
    status: "Completed",
  },
  {
    id: "AP001",
    date: "08 Jan 2024",
    mode: "Online",
    status: "Completed",
  },
  {
    id: "AP001",
    date: "08 Jan 2024",
    mode: "Online",
    status: "Completed",
  },
];

export const upcomingappointment = [
  {
    id: "AP001",
    date: "11 Mar 2024",
    mode: "Online",
    status: "Pending",
  },
];

export const testsandresults = [
  {
    date: "08 Jan 2024",
    testfor: "Malaria",
    conductedat: "Gilmore Labs",
    result: "Negative",
    action: <DownloadIcon />,
  },
  {
    date: "08 Jan 2024",
    testfor: "Malaria",
    conductedat: "Gilmore Labs",
    result: "Negative",
    action: <DownloadIcon />,
  },
  {
    date: "08 Jan 2024",
    testfor: "Malaria",
    conductedat: "Gilmore Labs",
    result: "Negative",
    action: <DownloadIcon />,
  },
  {
    date: "08 Jan 2024",
    testfor: "Malaria",
    conductedat: "Gilmore Labs",
    result: "Negative",
    action: <DownloadIcon />,
  },
  {
    date: "08 Jan 2024",
    testfor: "Malaria",
    conductedat: "Gilmore Labs",
    result: "Negative",
    action: <DownloadIcon />,
  },
  {
    date: "08 Jan 2024",
    testfor: "Malaria",
    conductedat: "Gilmore Labs",
    result: "Negative",
    action: <DownloadIcon />,
  },
  {
    date: "08 Jan 2024",
    testfor: "Malaria",
    conductedat: "Gilmore Labs",
    result: "Negative",
    action: <DownloadIcon />,
  },
  {
    date: "08 Jan 2024",
    testfor: "Malaria",
    conductedat: "Gilmore Labs",
    result: "Negative",
    action: <DownloadIcon />,
  },
];

export const postnote = [
  {
    heading: "Medical Consultation Summary",
    description:
      "Following our consultation on February 28, 2024, I have diagnosed John Doe with hypertension and prescribed",
    prescription: "1 Prescription",
  },
  {
    heading: "Medical Consultation Summary",
    description:
      "Following our consultation on February 28, 2024, I have diagnosed John Doe with hypertension and prescribed",
    prescription: "1 Prescription",
  },
  {
    heading: "Medical Consultation Summary",
    description:
      "Following our consultation on February 28, 2024, I have diagnosed John Doe with hypertension and prescribed",
    prescription: "1 Prescription",
  },
  {
    heading: "Medical Consultation Summary",
    description:
      "Following our consultation on February 28, 2024, I have diagnosed John Doe with hypertension and prescribed",
    prescription: "1 Prescription",
  },

  {
    heading: "Medical Consultation Summary",
    description:
      "Following our consultation on February 28, 2024, I have diagnosed John Doe with hypertension and prescribed",
    prescription: "1 Prescription",
  },
  {
    heading: "Medical Consultation Summary",
    description:
      "Following our consultation on February 28, 2024, I have diagnosed John Doe with hypertension and prescribed",
    prescription: "1 Prescription",
  },
];
