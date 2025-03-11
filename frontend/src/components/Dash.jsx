import { Center, Group, Paper, RingProgress, SimpleGrid, Text } from '@mantine/core';
import { useEffect, useState } from 'react';


export default function DashPage( {averageRatings, totalWatchTime}){
    const [progress, setProgress] = useState(0)
    const [totalMin,setTotalMin] = useState(0)
    useEffect(() => {
        if (totalMin < totalWatchTime) {
          const timer = setTimeout(() => {
            setTotalMin(prevTotalMin => prevTotalMin + 0.01*totalWatchTime);
            setProgress(prevProgress => prevProgress + 1);
          }, 10);
      
          return () => clearTimeout(timer);
        }
      }, [totalMin, totalWatchTime]);
    
    return(
        <div>
        <RingProgress
        size={260}
        roundCaps
        thickness={8}
        sections={[{ value: progress, color: "blue" }]}
        label={
          <Center>
            <h3 className='text-4xl'>{Math.round(totalMin)}</h3>
          </Center>
          
        }
        
      /> 
      <div>
      <h3>
        Your Average Rating
      </h3>
      <p>{Math.round(averageRatings.your_rating * 10) / 10}</p>
      </div>
      <div>
      <h3>
        IMDb's Average Rating
      </h3>
      <p>{Math.round(averageRatings.imdb_rating * 10) / 10}</p>
      </div>
      <div>
      <h3>
        Average Rating Difference
      </h3>
      <p>{Math.round((averageRatings.your_rating- averageRatings.imdb_rating)* 10) / 10}</p>

      </div>
      </div>
    )
}