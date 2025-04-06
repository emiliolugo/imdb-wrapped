import { Center, RingProgress } from '@mantine/core';
import { useEffect, useState } from 'react';
import NumberColor from './NumberColor';
import { useMediaQuery } from '@mantine/hooks';
import { motion } from 'motion/react';

export default function DashPage({ averageRatings, totalWatchTime }) {
  const [progress, setProgress] = useState(0);
  const [totalMin, setTotalMin] = useState(0);
  // Detect screens smaller than 768px (tablets & mobile)
  const isMobile = useMediaQuery('(max-width: 768px)');
  const roundedWatchTime = Math.round(totalWatchTime);
  const minutesWatchText = `You've watched movies for ${Math.round(roundedWatchTime/60)} hours or ${Math.round(roundedWatchTime/(60*24))} Days worth of your life. That is about the same amount of time it takes to drive to New York from LA and back ${Math.round(totalWatchTime/2500)} times!`
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
    <div>
    <h2 className='font-bold text-4xl md:text-6xl text-[#d4d4dc] text-center'><span className='text-[#FA4248]'>Your</span> Viewing History</h2>
    <div className="flex flex-col lg:flex-row w-screen h-auto lg:h-screen justify-center gap-x-15 items-center text-[#d4d4dc]">
      <div className='flex flex-col items-center'>
        <RingProgress
          size={isMobile ? 350 : 520}
          roundCaps
          thickness={8}
          sections={[{ value: progress, color: "#FA4248" }]}
          label={
            <Center className="flex flex-col">
              <h3 className="text-4xl lg:text-6xl text-center font-black">{Math.round(totalMin)}</h3>
              <p className="text-sm lg:text-base">Total Minutes Watched</p>
            </Center>
          }
          className='drop-shadow-lg'
        />
        <motion.div className='w-[80%] md:mt-20'
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:.5, delay: 3}}
        >
          <p className='md:text-2xl text-neutral-400 font-semibold'>{minutesWatchText}</p>
        </motion.div>
      </div>
    </div>
    </div>
  );
}
