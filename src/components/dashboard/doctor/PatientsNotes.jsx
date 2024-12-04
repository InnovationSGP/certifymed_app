import NotesCard from "../patients/notes/NotesCard";

const PatientsNotes = ({ postnote }) => {
  return (
    <>
      <div>
        <h3 className="mt-11 mb-2 text-lg font-medium  text-mainblack">
          Notes
        </h3>
        <hr />
        <div className="grid sm:grid-cols-2 gap-[22px] mt-2">
          {postnote?.slice(0, 2)?.map((note, index) => (
            <NotesCard
              note={note}
              key={index}
              additionalclass="border border-superSilver"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PatientsNotes;
