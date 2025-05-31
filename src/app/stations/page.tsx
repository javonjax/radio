import Filters from '../components/StationBrowser/Filters';
import StationList from '../components/StationBrowser/StationList';

const StationsPage = async () => {
  // const [stations, setStations] = useState<RadioStation[]>([]);
  const res = await fetch('http://localhost:3000/api/stations/search?limit=100&hidebroken=true');
  const data = await res.json();
  // setStations(data);
  return (
    <div className="flex h-full w-full flex-col">
      <Filters />
      <StationList stations={data} />
    </div>
  );
};

export default StationsPage;
