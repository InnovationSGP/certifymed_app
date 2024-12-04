import MenuDropdown from "@/components/common/MenuDropdown";

const PatientsAppointmentsListItem = ({ obj }) => {
  const links = [
    { href: "/settings", label: "Settings" },
    { href: "/support", label: "Support" },
    { href: "/license", label: "License" },
  ];

  return (
    <>
      <tr>
        <td className="table-heading !font-normal">{obj.id}</td>
        <td className="table-heading !font-normal">{obj.date}</td>
        <td className="table-heading !font-normal">{obj.mode}</td>
        <td className="table-heading !font-normal">{obj.status}</td>
        <td className="table-heading !font-normal">
          <MenuDropdown links={links} heading={"Select Action"} />
        </td>
      </tr>
    </>
  );
};

export default PatientsAppointmentsListItem;
