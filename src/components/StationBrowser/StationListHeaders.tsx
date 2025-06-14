const StationListHeaders = (): React.JSX.Element => {
  return (
    <div className="bg-background sticky top-0 flex w-full p-4">
      <div className="w-[30%]">Name</div>
      <div className="w-[30%]">Info</div>
      <div className="w-[20%]">Tags</div>
      <div className="w-[20%]"></div>
    </div>
  );
};

export default StationListHeaders;
