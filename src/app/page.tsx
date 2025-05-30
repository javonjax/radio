import { Tag } from './api/lib/schemas';
import HomePageContent from './components/HomePage/HomePageContent';

const HomePage = async () => {
  const res: globalThis.Response = await fetch(
    'http://localhost:3000/api/tags?order=stationcount&reverse=true&hidebroken=true&limit=10'
  );
  const tags: Tag[] = await res.json();

  return <HomePageContent popularTags={tags} />;
};

export default HomePage;
