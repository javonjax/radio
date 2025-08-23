import React, { Suspense } from 'react';
import StationBrowserPage from './page';

const layout = () => {
  return (
    <Suspense>
      <StationBrowserPage />
    </Suspense>
  );
};

export default layout;
