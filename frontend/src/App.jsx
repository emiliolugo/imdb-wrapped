import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import ChartPage from './components/Chart';
import DashPage from './components/Dash';
import '@mantine/core/styles.css';
import { motion } from "motion";
import { MantineProvider } from '@mantine/core';
import DifferingOpinionsPage from './components/DiffOpinions';
import { easeInOut } from 'motion';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const refArray = [useRef(), useRef(), useRef(), useRef()];
  const [isChartInViewOne, setIsChartInViewOne] = useState(false);

  const handleChartInViewOneFunc = () => {
    setIsChartInViewOne(true);
  };

  // New states in camelCase
  const [individualGenres, setIndividualGenres] = useState(null);
  const [averageDifference, setAverageDifference] = useState(null);
  const [averageRatings, setAverageRatings] = useState(null);
  const [differingOpinions, setDifferingOpinions] = useState(null);
  const [firstMovieRated, setFirstMovieRated] = useState(null);
  const [imdbRatings, setImdbRatings] = useState(null);
  const [lastMovieRated, setLastMovieRated] = useState(null);
  const [movieLengthStats, setMovieLengthStats] = useState(null);
  const [topDirectors, setTopDirectors] = useState(null);
  const [totalWatchTime, setTotalWatchTime] = useState(null);
  const [yourRatings, setYourRatings] = useState(null);

  const handleFileDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setFile(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  };

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
    setIsDragging(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError("Please select a file.");
      return;
    }
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload-file', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await response.json();
      // Convert the data into an array of key-value pairs
      const resultArray = Object.entries(data).map(([key, value]) => ({ key, value }));
      setResult(resultArray);
    } catch (err) {
      setError("Error submitting file.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (result) {
      const getValueForKey = (key) => {
        const entry = result.find(item => item.key === key);
        return entry ? entry.value : undefined;
      };

      setIndividualGenres(getValueForKey("individual_genres"));
      setAverageDifference(getValueForKey("average_difference"));
      setAverageRatings(getValueForKey("average_ratings"));
      setDifferingOpinions(getValueForKey("differing_opinions"));
      setFirstMovieRated(getValueForKey("first_movie_rated"));
      setImdbRatings(getValueForKey("imdb_ratings"));
      setLastMovieRated(getValueForKey("last_movie_rated"));
      setMovieLengthStats(getValueForKey("movie_length_stats"));
      setTopDirectors(getValueForKey("top_directors"));
      setTotalWatchTime(getValueForKey("total_watch_time"));
      setYourRatings(getValueForKey("your_ratings"));
    }
  }, [result]);

  return (
    <MantineProvider className="bg-[#393f4d]">
      <div className="bg-[#393f4d] w-screen min-h-screen flex flex-col items-center">
        {!result && (
          <div className='mt-20 sm:mt-60 p-5 sm:p-20 w-screen text-center bg-[#393f4d]'>
            <h1 className='font-7xl font-black text-[#d4d4dc]'>
              Your Favorite Films.<br /> Your Cut.
            </h1>
            <form onSubmit={handleSubmit}>
              <div className=' mx-auto'>
              <motion.div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleFileDrop}
                className={`
                  relative m-5 sm:m-20 text-center border border-2 
                  p-5 rounded-lg border-[#d4d4dc] text-[#d4d4dc]
                  transition-all duration-1000
                `}
              >
                {file ? (
                  <p>File Uploaded!</p>
                ) : (
                  <p>Drag and drop your IMDb CSV file here, or click to select one.</p>
                )}
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  style={{
                    opacity: 0,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer'
                  }}
                />
              </motion.div>
              </div>
              <motion.button
                type="submit"
                className="mt-3"
                style={{
                  color: "#d4d4dc",
                  border: "solid",
                  backgroundColor: "transparent"
                }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#d4d4dc",
                  color: "#393f4d",
                  border: "solid",
                  borderColor: "#d4d4dc"
                }}
              >
                Submit
              </motion.button>
            </form>
          </div>
        )}
        {individualGenres && (
          <div className='bg-[#393f4d] w-full'>
            <motion.div
              animate={{ translateY: -20, opacity: 1 }}
              transition={{ duration: 0.5, ease: easeInOut }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              className='h-screen flex items-center justify-center'
            >
              <h1 className='text-center font-black text-[#d4d4dc]'>Your Stats are Ready.</h1>
            </motion.div>
            <motion.div
              ref={refArray[0]}
              animate={{ translateY: -20, opacity: 1 }}
              transition={{ duration: 0.5, ease: easeInOut }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              className='flex items-center justify-center'
            >
              <DashPage averageRatings={averageRatings} totalWatchTime={totalWatchTime} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              onViewportEnter={handleChartInViewOneFunc}
              transition={{ duration: 0.5, ease: easeInOut }}
              className='flex flex-col lg:flex-row h-auto lg:h-screen items-center justify-center'
            >
              <ChartPage chartData={individualGenres} title={"Your Favorite Genres"} isChartInView={isChartInViewOne} />
              <ChartPage chartData={topDirectors} title={"Your Top 5 Directors"} isChartInView={isChartInViewOne} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: easeInOut }}
              className='flex flex-col lg:flex-row h-auto lg:h-screen items-center justify-center'
            >
              <ChartPage chartData={yourRatings} title={"Your Ratings"} isChartInView={isChartInViewOne} />
              <ChartPage chartData={imdbRatings} title={"IMDb's Ratings"} isChartInView={isChartInViewOne} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: easeInOut }}
              className='md:h-screen h-auto'
            >
              <DifferingOpinionsPage differingOpinions={differingOpinions} />
            </motion.div>
          </div>
        )}
      </div>
    </MantineProvider>
  );
}

export default App;
