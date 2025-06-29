import { SquareArrowOutUpRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export interface FaviconProps {
  src: string;
  className?: string;
  width: number;
  height: number;
  alt: string;
}

const Favicon = ({ src, className, width, height, alt }: FaviconProps) => {
  const [imgError, setImageError] = useState<boolean>(false);

  if (imgError) {
    return (
      <a href={src} target="_blank" rel="noopener noreferrer">
        <SquareArrowOutUpRight
          className={`mr-4 ${className} h-[${height}px] w-[${width}px] min-h-[${height}px] min-w-[${width}px]`}
        />
      </a>
    );
  }

  return (
    <a href={src} target="_blank" rel="noopener noreferrer">
      <Image
        src={src}
        className={`mr-4 h-[${height}px] w-[${width}px] min-h-[${height}px] min-w-[${width}px] ${className}`}
        width={width}
        height={height}
        alt={alt}
        onError={() => setImageError(true)}
      />
    </a>
  );
};

export default Favicon;
