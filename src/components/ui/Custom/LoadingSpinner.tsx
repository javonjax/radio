import { Spinner } from '../spinner';

const LoadingSpinner = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner size="large" />
    </div>
  );
};

export default LoadingSpinner;
