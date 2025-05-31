import React from 'react';

const StationsListHeaders = () => {
  return (
    <div className="flex w-full p-4">
      <div className="w-[30%]">Name</div>
      <div className="w-[30%]">Info</div>
      <div className="w-[20%]">Tags</div>
      <div className="w-[20%]">Last Online Check</div>
    </div>
  );
};

export default StationsListHeaders;
