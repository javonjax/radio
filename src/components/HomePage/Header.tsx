const Header = () => {
  const val: number = Math.random() - 0.5;
  return (
    <>
      <div className="col-span-full flex flex-col items-center justify-center">
        <h1 className="text-center text-3xl">
          {val > 0 ? 'Catch a wave. Find your sound.' : 'Tune in. Ride the waves.'}
        </h1>
        <h2 className="text-center">
          Browse radio stations from around the world, all in one place.
        </h2>
      </div>
      <div className="col-span-full flex items-center justify-center gap-6">
        <a
          className="rounded-md bg-linear-(--accent-gradient) p-4"
          href="/stations?order=clickcount"
        >
          Browse Stations
        </a>
        {/* <a className="rounded-md border-2 p-4" href="/faq">
          FAQ
        </a> */}
      </div>
    </>
  );
};

export default Header;
