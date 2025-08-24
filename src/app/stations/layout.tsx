import React, { Suspense } from 'react';

const StationPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense>{children}</Suspense>;
};

export default StationPageLayout;
