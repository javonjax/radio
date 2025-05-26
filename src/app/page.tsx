const HomePage = () => {
  const val: number = Math.random() - 0.5;
  return (
    <div className="grid h-full w-full grid-cols-12 gap-6">
      <div className="col-span-full flex flex-col items-center justify-center">
        <h1 className="text-3xl">
          {val > 0 ? 'Catch a wave. Find your sound.' : 'Tune in. Ride the waves.'}
        </h1>
        <h2>Browse radio stations from around the world, all in one place.</h2>
      </div>
      <div className="col-span-full flex items-center justify-center gap-6">
        <a className="bg-button cursor-pointer rounded-xl border-2 p-4">Browse Stations</a>
        <button className="rounded-xl border-2 p-4">FAQ</button>
      </div>
      <div className="col-span-full flex flex-col items-center gap-6">
        <h2 className="text-heading mr-auto text-xl">Trending Now</h2>
        <div className="flex h-[400px] w-full items-center justify-center border-2">Carousel</div>
      </div>
      <div className="col-span-full flex flex-col items-center gap-6">
        <h2 className="text-heading mr-auto text-xl">Popular Station Tags</h2>
        <div className="flex h-[400px] w-full items-center justify-center border-2">Carousel</div>
      </div>
    </div>
  );
};

export default HomePage;
