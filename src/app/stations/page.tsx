import Filters from '../components/StationsPage/Filters';

const StationsPage = () => {
  return (
    <div className="grid h-full w-full grid-cols-12 border-2">
      <Filters />
      <table className="col-span-full table-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Tags</th>
            <th>Last Online Check</th>
            <th>Last Update</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-2">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td className="border-2">Malcolm Lockyer</td>
            <td>1961</td>
            <td>1961</td>
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
          </tr>
          <tr>
            <td className="border-2">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td className="border-2">Malcolm Lockyer</td>
            <td>1961</td>
            <td>1961</td>
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
          </tr>
          <tr>
            <td className="border-2">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td className="border-2">Malcolm Lockyer</td>
            <td>1961</td>
            <td>1961</td>
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StationsPage;
