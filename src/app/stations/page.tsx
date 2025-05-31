import Filters from '../components/StationsPage/Filters';
import StationsList from '../components/StationsPage/StationsList';

const StationsPage = async () => {
  // const [stations, setStations] = useState<RadioStation[]>([]);
  const res = await fetch('http://localhost:3000/api/stations/search?limit=100&hidebroken=true');
  const data = await res.json();
  // setStations(data);
  return (
    <div className="flex h-full w-full flex-col">
      <Filters />
      <StationsList stations={data} />
    </div>
  );
};

export default StationsPage;
