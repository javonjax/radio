const HomePage = () => {
  return (
    // <div className="flex h-full w-full grow flex-col items-center justify-center">
    //   <div>browse</div>
    // </div>
    <div className="grid h-full w-full grid-cols-12">
      <div className="col-span-full flex items-center justify-center border-2">
        <h1 className="text-2xl">Browse radio stations from around the world, all in one place.</h1>
      </div>
      <div className="col-span-full border-2">Carousel</div>
    </div>
  );
};

export default HomePage;
