import { DownloadIcon } from "@/components/common/AppIcons";

const PatientsTestAndResults = ({ testsandresults }) => {
  return (
    <>
      <div className="mt-11">
        <h3 className="mb-2 text-lg font-medium  text-mainblack">
          Tests & Results
        </h3>
        {/*  */}
        <table className="min-w-full bg-graywhite rounded-b-xl">
          <thead>
            <tr>
              <th className="table-heading">Date</th>
              <th className="table-heading">Test For</th>
              <th className="table-heading">Conducted at</th>
              <th className="table-heading">Result</th>
              <th className="table-heading">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {testsandresults.map((patientsresults, index) => (
              <tr key={index}>
                <td className="table-heading !font-normal xl:!pr-0">
                  {patientsresults.date}
                </td>
                <td className="table-heading !font-normal">
                  {patientsresults.testfor}
                </td>
                <td className="table-heading !font-normal xl:!pr-0">
                  {patientsresults.conductedat}
                </td>
                <td className="table-heading !font-normal xl:!pr-0">
                  {patientsresults.result}
                </td>
                <td className="table-heading !font-normal xl:!pr-0">
                  <button>
                    <DownloadIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PatientsTestAndResults;
