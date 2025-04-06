import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import ChartPage from './components/Chart';
import DashPage from './components/Dash';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { motion } from 'motion/react';
import { easeInOut } from 'motion';
import DifferingOpinionsPage from './components/DiffOpinions';
import FormUpload from './components/Form';
import NumberColor from './components/NumberColor';
import Footer from './components/Footer';
import TutorialModal from './components/TutorialModal';

function App() {
  const [result, setResult] = useState(null);
  const refArray = [useRef(), useRef(), useRef(), useRef()];
  const [isChartInViewOne, setIsChartInViewOne] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);


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
  const [favGenre, setFavGenre] = useState(null);
  // Handler for form submission results
  const handleFileSubmit = (resultArray) => {
    setResult(resultArray);
    setUploadOpen(false);
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

  useEffect(() => {
    let genre = []
    if(individualGenres){
    genre = Object.keys(individualGenres)
    .map(key => ({
      name: key,
      count: individualGenres[key]
    }))
    .sort((a, b) => b.count - a.count);
    setFavGenre(genre[0].name)}
    
  },[individualGenres])


  return (
    <MantineProvider className="bg-[#393f4d]">
      <div className="bg-gradient-to-r from-[#2A006F] to-[#0A0144] w-screen h-auto flex flex-col items-center justify-center">
        {!result && (
          <div className='w-full min-h-screen flex flex-col items-center justify-center px-4 md:px-0 md:flex-row md:justify-around'>
          <div className='text-center md:text-left max-w-full'>
            <div>
              <h1 className='text-4xl md:text-6xl font-black text-[#d4d4dc] drop-shadow-md'>
                <span className='text-[#FA4248]'>Your</span> Favorite Films.<br /> <span className='text-[#FA4248]'>Your</span> Cut.
              </h1>
            </div>
            <p className='text-stone-300 text-lg w-full md:w-[35vw] mt-6 md:mt-10'>
              Upload your IMDb data and uncover your personal cinematic universe. Discover the genres you crave to the directors you adore.
            </p>
            <div className='flex flex-col md:flex-row gap-4 md:gap-x-10'>
              <motion.button
                className='mt-8 mb-4 md:my-20 bg-[#FA4248] mx-auto md:mr-auto md:ml-0 hover:bg-transparent duration-250 text-[#d4d4dc] p-3 md:p-4 rounded-full border-1 border-[#FA4248] w-full md:w-auto'
                whileHover={{ scale: 1.05 }}
                onClick={() => setTutorialOpen(true)}>
                <span className='font-semibold drop-shadow-lg'>Where is my IMDb data?</span>
              </motion.button>
              <motion.button
                className='mb-8 mt-0 md:my-20 bg-[#02013A] mx-auto duration-250 text-[#d4d4dc] p-3 md:p-4 rounded-full border-1 border-[#02013A] w-full md:w-auto'
                whileHover={{ scale: 1.05 }}
                onClick={() => setUploadOpen(true)}>
                <span className='font-semibold drop-shadow-lg'>Upload IMDb csv File</span>
              </motion.button>
            </div>
          </div>
          {uploadOpen && (
            <FormUpload 
              onFileSubmit={handleFileSubmit} 
              setUploadOpen={setUploadOpen} 
            />
          )}
          {tutorialOpen && (
  <TutorialModal setTutorialOpen={setTutorialOpen} />
)}
        </div>
        )}
        {individualGenres && (
          <div className='h-auto'>
            <div className='h-screen flex items-center justify-center'>
            <h1 className='text-center font-black text-[#d4d4dc] text-6xl md:text-7xl shadow'><span className='text-[#FA4248]'>Your</span> Stats are Ready.</h1>
            </div>
            <div>
            
            <motion.div
              ref={refArray[0]}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: easeInOut }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              className='flex items-center justify-center'
            >
              <DashPage averageRatings={averageRatings} totalWatchTime={totalWatchTime} />
            </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0}}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              onViewportEnter={handleChartInViewOneFunc}
              transition={{ duration: 0.5, ease: easeInOut }}
              className='flex flex-col w-screen h-auto md:h-screen items-center pb-10'
            >
              <h2 className='text-4xl md:text-6xl font-bold text-[#d4d4dc] my-auto'><span className='text-[#FA4248]'>Your</span> Favorite Genres</h2>
              <div className='flex md:flex-row flex-col w-full md:w-[80vw] justify-between items-center gap-x-20'>
              <div className='md:w-40'>
                <h3 className='text-[#d4d4dc] md:text-4xl md:w-[50vw] mx-auto drop-shadow-md'><span className='text-[#FA4248] font-bold'>Your</span> top genre is <span className='font-bold text-[#FA4248]'>{favGenre}</span></h3>
              </div>
              <div className='md:w-[50vw] w-[100%]'>
              <ChartPage chartData={individualGenres} title={"Your Favorite Genres"} isChartInView={isChartInViewOne} />
              </div>
              </div>
              <p className='md:text-2xl text-neutral-400 md:m-0 ml-5 font-semibold '>You have watched movies from <span className='text-[#FA4248] font-bold'>{Object.keys(individualGenres).length}</span> different genres</p>

            </motion.div>
            <motion.div
              initial={{ opacity: 0}}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              onViewportEnter={handleChartInViewOneFunc}
              transition={{ duration: 0.5, ease: easeInOut }}
              className='flex flex-col w-screen h-screen lg:h-screen items-center pb-10'
            >
              <h2 className='text-4xl md:text-6xl font-bold text-[#d4d4dc] my-auto'><span className='text-[#FA4248]'>Your</span> Top Directors</h2>
              <div className='flex md:flex-row flex-col w-[80vw] justify-between items-center gap-x-20'>
              <ChartPage chartData={topDirectors} title={"Your Top 5 Directors"} isChartInView={isChartInViewOne} />
              <div className='w-[50%]' >
                <h3 className='text-[#d4d4dc] md:m-0 mt-10 md:text-4xl w-[50vw] drop-shadow-md ml-auto'><span className='text-[#FA4248] font-bold'>Your</span> top director is <span className='font-bold text-[#FA4248]'>{topDirectors[0][0]}</span></h3>
              </div>
              </div>

            </motion.div>

            <motion.div
              initial={{ opacity: 0}}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              onViewportEnter={handleChartInViewOneFunc}
              transition={{ duration: 0.5, ease: easeInOut }}
              className='flex flex-col w-screen h-auto md:h-screen items-center pb-10'
            >
              <h2 className='md:text-6xl text-4xl font-bold text-[#d4d4dc] my-auto drop-shadow-md'><span className='text-[#FA4248]'>Your</span> Ratings</h2>
              <p className='my-5 md:mx-0 text-sm md:text-2xl flex text-neutral-400 font-semibold my-auto drop-shadow-md'>You rate&nbsp;
              <span>
              <NumberColor value={Math.round((averageRatings.your_rating - averageRatings.imdb_rating) * 10) / 10} version={3} />
              </span>
              &nbsp; points&nbsp;
              {averageRatings.your_rating - averageRatings.imdb_rating > 0? "above" : "below"} the average&nbsp;<span className='text-[#F5C518] font-bold'>IMDb</span>&nbsp;user.</p>
              <div className='flex flex-col md:flex-row md:w-[80vw] justify-around items-center gap-x-20'>
              <div className='w-full flex flex-col items-center mb-10 md:mb-0'>
              <ChartPage chartData={yourRatings} title={"Your Ratings"} isChartInView={isChartInViewOne} />
              <p className='text-2xl flex text-neutral-400 font-semibold drop-shadow-md'><span className='text-[#FA4248]'>Your</span>&nbsp;average rating:&nbsp;<NumberColor value={Math.round(averageRatings.your_rating * 10) / 10} version={1} /></p>
              </div>
              <div className='w-full flex flex-col items-center mb-10 md:mb-0'>
              <ChartPage chartData={imdbRatings} title={"IMDb's Ratings"} isChartInView={isChartInViewOne} />
              <p className='text-2xl flex text-neutral-400 font-semibold drop-shadow-md'><span className='text-[#F5C518] font-bold'>IMDb's</span>&nbsp;average rating:&nbsp;<NumberColor value={Math.round(averageRatings.imdb_rating * 10) / 10} version={1} /></p>
              </div>
              </div>
           
              <h2 className='text-4xl font-semibold text-[#d4d4dc] my-auto drop-shadow-md text-center'><span className='text-[#FA4248] font-bold'>Your</span> Ratings vs. <span className='text-[#F5C518] font-bold'>IMDb's</span> Ratings</h2>
              
            </motion.div>
          
            <motion.div
              initial={{ opacity: 0,}}
              whileInView={{ opacity: 1}}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: easeInOut }}
              className='h-auto md:h-screen mt-auto hidden md:block'
            >
              <DifferingOpinionsPage differingOpinions={differingOpinions} />
            </motion.div>
          </div>
        )}
        <Footer />
      </div>
    </MantineProvider>
  );
}

export default App;