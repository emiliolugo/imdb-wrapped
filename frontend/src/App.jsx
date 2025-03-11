import React, { useEffect, useState } from 'react';
import './App.css';
import ChartPage from './components/Chart';
import DashPage from './components/Dash';
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import DifferingOpinionsPage from './components/DiffOpinions';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
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

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError("Please select a file.");
      return;
    }
    console.log(file);
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/upload-file', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });
      console.log(formData);

      const data = await response.json();
      // Convert the data into an array of key-value pairs
      const resultArray = Object.entries(data).map(([key, value]) => ({ key, value }));
      setResult(resultArray);
      console.log(JSON.stringify(resultArray, null, 2));
    } catch (err) {
      setError("Error submitting file.");
    } finally {
      setLoading(false);
    }
  };

  // Extract each value from result and set corresponding state in camelCase
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
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className="App">
        <h1>Your Movie Stats: Wrapped</h1>
        
        {/* Only show the file upload form if the file hasn't been successfully uploaded */}
        {!result && (
          <form onSubmit={handleSubmit}>
            <div
              onDragOver={handleDragOver}
              onDrop={handleFileDrop}
              style={{
                border: '2px dashed #ccc',
                borderRadius: '20px',
                padding: '20px',
                textAlign: 'center',
                marginBottom: '20px',
                position: 'relative'
              }}
            >
              {file ? (
                <p>File Uploaded!</p>
              ) : (
                <p>Drag and drop a CSV file here, or click to select one.</p>
              )}
              {/* Invisible file input over the drop zone */}
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
            </div>
            <button type="submit">Submit</button>
          </form>
        )}

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {/* You can now use the individual state values to build your components */}
        {individualGenres && (
          <div>
            <DashPage averageRatings={averageRatings} totalWatchTime={totalWatchTime} />
            <ChartPage chartData={individualGenres} title={"Your Genres Ranked"} />
            <ChartPage chartData={yourRatings} title={"Your Ratings"} />
            <ChartPage chartData={imdbRatings} title={"IMDb's Ratings"} />
            <ChartPage chartData={topDirectors} title={"Your Top 5 Directors"} />

            <DifferingOpinionsPage differingOpinions={differingOpinions} />
          </div>
        )}
        {/* Repeat similar rendering for other state variables as needed */}
      </div>
    </MantineProvider>
  );
}

export default App;
