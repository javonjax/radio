const Header = () => {
  const val: number = Math.random() - 0.5;
  return (
    <>
      <div className="col-span-full flex flex-col items-center justify-center">
        <h1 className="text-3xl">
          {val > 0 ? 'Catch a wave. Find your sound.' : 'Tune in. Ride the waves.'}
        </h1>
        <h2>Browse radio stations from around the world, all in one place.</h2>
      </div>
      <div className="col-span-full flex items-center justify-center gap-6">
        <a className="bg-button rounded-xl p-4" href="/stations">
          Browse Stations
        </a>
        <a className="rounded-xl p-4" href="/faq">
          FAQ
        </a>
      </div>
    </>
  );
};

export default Header;
