import DashboardLayout from "@/components/common/DashboardLayout";
import DashboardWelcome from "@/components/common/DashboardWelcome";
import NotesList from "@/components/dashboard/patients/notes/NotesList";

export const metadata = {
  title: " CertifyMed -Notes",
  description:
    "Discover the future of healthcare through  CertifyMed: top-tier medical care at your fingertips. No more waiting—access qualified professionals instantly from home.",
};

const NotesPage = () => {
  return (
    <>
      <DashboardLayout className="overflow-auto">
        <DashboardWelcome heading="Notes" buttontext="Add Note" />
        <NotesList />
      </DashboardLayout>
    </>
  );
};

export default NotesPage;
