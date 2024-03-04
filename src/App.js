import React, { useState, useEffect } from 'react';
import './App.css';
import requests from './requests';
import Row from './component/Row'
import Banner from './component/Banner';
import Navbar from './component/Navbar';
import SearchBar from './component/SearchBar';

function App() {

  const [searchQuery, setSearchQuery] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  useEffect(() => {
    window.onbeforeunload = () => {
      // Save search query to local storage
      localStorage.setItem('searchQuery', searchQuery);
    };

    // Load search query from local storage
    const storedQuery = localStorage.getItem('searchQuery');
    if (storedQuery) {
      setSearchQuery(storedQuery);
    }
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);

    

    window.addEventListener('beforeunload', () => {
      setRefreshKey(prevKey => prevKey + 1);
    });
    
  };

  return (
    <div className="App">
      <Navbar />
      <SearchBar onSearch={handleSearch}/>
      <Banner />

      <h1>Netflix clone</h1>

      <Row key={refreshKey + 1} title='Netflix Originals' fetchUrl={requests.fetchNetflixOriginals}/>
      <Row key={refreshKey + 2} title='Trending' fetchUrl={requests.fetchTrending}/>
      <Row key={refreshKey + 3} title='Top Rated' fetchUrl={requests.fetchTopRated}/>
      <Row key={refreshKey + 4} title='Action Movies ' fetchUrl={requests.fetchActionMovies}/>
      <Row key={refreshKey + 5} title='Comedy Movies' fetchUrl={requests.fetchComedyMovies}/>
      <Row key={refreshKey + 6} title='Romance Movies' fetchUrl={requests.fetchRomanceMovies}/>
      <Row key={refreshKey + 7} title='Horror Movies' fetchUrl={requests.fetchHorrorMovies}/>
      <Row key={refreshKey + 8} title='Documentaries' fetchUrl={requests.fetchDocumentaries}/>
    </div>
  );
}

export default App;
