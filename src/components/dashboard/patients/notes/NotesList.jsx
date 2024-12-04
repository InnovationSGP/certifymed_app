import { postnote } from "@/components/common/Helper";
import NotesCard from "./NotesCard";

const NotesList = () => {
  return (
    <>
      <section className="px-5 md:px-[35px] mt-[55px] mb-20 xl:mb-0">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 lg:gap-[22px]">
          {postnote.map((note, index) => (
            <NotesCard
              note={note}
              key={index}
              additionalclass="border border-superSilver"
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default NotesList;
