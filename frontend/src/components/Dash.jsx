import { Center, RingProgress } from '@mantine/core';
import { useEffect, useState } from 'react';
import NumberColor from './NumberColor';
import { useMediaQuery } from '@mantine/hooks';

export default function DashPage({ averageRatings, totalWatchTime }) {
  const [progress, setProgress] = useState(0);
  const [totalMin, setTotalMin] = useState(0);
  // Detect screens smaller than 768px (tablets & mobile)
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (totalMin < totalWatchTime) {
      const timer = setTimeout(() => {
        setTotalMin(prevTotalMin => prevTotalMin + 0.01 * totalWatchTime);
        setProgress(prevProgress => prevProgress + 1);
      }, 10);

      return () => clearTimeout(timer);
    }
  }, [totalMin, totalWatchTime]);

  return (
    <div className="flex flex-col lg:flex-row w-screen h-auto lg:h-[80vh] justify-around items-center text-[#d4d4dc]">
      <div className="mb-8 lg:mb-0">
        <RingProgress
          size={isMobile ? 350 : 520}
          roundCaps
          thickness={8}
          sections={[{ value: progress, color: "#feda6a" }]}
          label={
            <Center className="flex flex-col">
              <h3 className="text-4xl lg:text-6xl text-center font-black">{Math.round(totalMin)}</h3>
              <p className="text-sm lg:text-base">Total Minutes Watched</p>
            </Center>
          }
        />
      </div>
      <div className="flex flex-col items-center w-full lg:w-[40vw] mb-8 lg:mb-20">
        <div className="flex flex-col lg:flex-row justify-between gap-y-4 lg:gap-x-10 mb-8 lg:mb-20 w-full">
          <div className="flex flex-col items-center">
            <h3 className="text-xl lg:text-4xl font-semibold">
              Your Average Rating
            </h3>
            <NumberColor value={Math.round(averageRatings.your_rating * 10) / 10} version={1} />
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-xl lg:text-4xl font-semibold">
              IMDb's Average Rating
            </h3>
            <NumberColor value={Math.round(averageRatings.imdb_rating * 10) / 10} version={2} />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-xl lg:text-4xl font-semibold">
            Average Rating Difference
          </h3>
          <NumberColor value={Math.round((averageRatings.your_rating - averageRatings.imdb_rating) * 10) / 10} version={3} />
        </div>
      </div>
    </div>
  );
}
