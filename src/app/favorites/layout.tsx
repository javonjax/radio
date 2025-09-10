import React, { Suspense } from 'react';

const FavoritesPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense>{children}</Suspense>;
};

export default FavoritesPageLayout;
